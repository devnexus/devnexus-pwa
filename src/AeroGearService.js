import { Auth } from '@aerogear/auth';
const { init }  = require("@aerogear/app");

class AeroGearService {

    
    constructor() {


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
                    "enable-cors":true
                }
                }
            ]
        });

        this.auth = new Auth(core.config);
        
        const initOptions = { onLoad: 'login-required' };
        this.initialized =this.auth.init(initOptions);

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
                    reject(err);
                });
            } else {
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