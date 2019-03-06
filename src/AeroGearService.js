/* eslint-disable no-console */
import { Auth } from '@aerogear/auth';
import { init } from "@aerogear/app";
import {
    createClient
} from '@aerogear/voyager-client';
import gql from 'graphql-tag';

class AeroGearService {


    constructor() {

        this.user = {}

        const core = init({
            "version": 1,
            "namespace": "devnexus-mobile",
            "clientId": "devnexus-client",
            "services": [
                {
                    "id": "945cb366-3eb8-11e9-a40b-127551823fe4",
                    "name": "keycloak",
                    "type": "keycloak",
                    "url": "https://keycloak-route-devnexus-mobile.apps.atlanta-69c6.openshiftworkshop.com/auth",
                    "config": {
                        "auth-server-url": "https://keycloak-route-devnexus-mobile.apps.atlanta-69c6.openshiftworkshop.com/auth",
                        "confidential-port": 0,
                        "public-client": true,
                        "realm": "devnexus-mobile",
                        "resource": "devnexus-client-public",
                        "ssl-required": "external",
                        "enable-cors": true
                    }
                }
            ]
        });

        this.auth = new Auth(core.config);
        this.syncConfig = {
            httpUrl: "http://localhost:4000/graphql",
            wsUrl: "ws://localhost:4000/graphql",
        };

        const initOptions = { onLoad: 'login-required' };
        this.initialized = this.auth.init(initOptions);
        this.syncConfig.authContextProvider = this.auth.getAuthContextProvider();
        this.syncClient = createClient(this.syncConfig);
        this.submitFeedback = this.submitFeedback.bind(this);
        this.getAuth = this.getAuth.bind(this);
        this.isEnabled = this.isEnabled.bind(this);
        this.authenticated = this.authenticated.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getAuthContextProvider = this.getAuthContextProvider.bind(this);
        
    }

    submitFeedback(trackTitle, feedback, rating) {
        return this.syncClient.then(client => {
            client.mutate({
                fetchPolicy: 'no-cache',
                mutation: gql`mutation postFeedback {
                        postFeedback (feedback: {sessionName:"${trackTitle}", comment:"${feedback}", score: ${rating} }) 
                        {sessionName}
                    }`
            }).then(()=>console.log("Feedback success")).catch(err=>console.log(err))
        })
    }

    getAuth() {
        return this.auth;
    }

    isEnabled() {
        return true;
    }

    authenticated() {
        return this.auth.isAuthenticated();
    }

    start() {
        return this.getProfile()
            .then(()=> {
                return this.syncClient.then(client => {client.query({
                    fetchPolicy: 'network-only',
                    query: gql`{me {displayName}}`
                })
                //Print the response of the query
                .then(({data}) => {
                    this.user= data.me;
                    return this.user;
                })
                .catch((err) => {
                    console.log("Sync failure")
                    console.log(err)
                })});
        }).then(()=> {
            return this.syncClient.then((client)=> {
                client.subscribe({
                    query: gql`subscription{userActivity {
                        feedback {
                          sessionName
                          score
                          comment
                        }
                      }}`
                }).subscribe({
                    next(data) {
                        console.log("Subscription data")
                      console.log(data)
                    },
                    error(err) { console.error('err', err); },
                  });
            })
        });
    }

    getProfile() {
        return new Promise((resolve, reject) => {
            if (this.isEnabled()) {
                return this.initialized.then((success) => {
                    
                    if (success && this.auth.isAuthenticated()) {
                        this.auth.extract().loadUserProfile().success((profile) => {
                            resolve(profile);
                        }).error(reject);
                    } else {
                        return reject('Not authenticated');
                    }
                }).catch((err) => {
                    console.log("Auth failed");
                    reject(err);
                });
            } else {
                console.log("Auth not enabled");
                return reject('Not enabled');
            }
        });
    }

    login() {
        if (this.isEnabled()) {
            return this.auth.login();
        } else {
            return Promise.reject('not enabled');
        }
    }

    logout() {
        if (this.isEnabled()) {
            return this.auth.logout();
        } else {
            return Promise.reject('not enabled');
        }
    }

    getAuthContextProvider() {
        if (this.isEnabled()) {
            return this.auth.getAuthContextProvider();
        }
        return undefined;
    }


}

export default new AeroGearService();