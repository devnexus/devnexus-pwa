import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore";


class FirebaseService {

    constructor() {
        const config = {
            apiKey: "AIzaSyCCijtbrNzY9D4WqgLS_9qrndWfPDTYntI",
            authDomain: "devnexus-2020.firebaseapp.com",
            databaseURL: "https://devnexus-2020.firebaseio.com",
            projectId: "devnexus-2020",
            storageBucket: "devnexus-2020.appspot.com",
            messagingSenderId: "302662622980"
        };

        firebase.initializeApp(config);

        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.db.enablePersistence()
            .catch(function(err) {
                /* eslint-disable-next-line no-console */
               console.log(err)
            });

        this.auth.onAuthStateChanged(
            
            (user) => {
                if (user) {
                    this.db.collection("users").doc(user.uid).set(
                        {
                            displayName:user.displayName,
                            email: user.email
                        }, { merge: true }
                    ).then(()=>{})
                    /* eslint-disable-next-line no-console */
                     .catch((err)=> console.log(err));
                }
            }
        );
        this.submitFeedback = this.submitFeedback.bind(this);
    }

    submitFeedback(trackTitle, feedback, rating) {
        var user = firebase.auth().currentUser;
        if (user) {
            return this.db.collection("users").doc(user.uid).update(
                new firebase.firestore.FieldPath("feedback", trackTitle),
                {
                    comment: feedback,
                    score: rating
                }
            ).then(()=>{})
            /* eslint-disable-next-line no-console */
            .catch((err)=> console.log(err));
        } else {
            /* eslint-disable-next-line no-console */
            console.log("Do not add feedback if the user is not logged in.")
            return new Promise(()=>{});
        }
        return new Promise(()=>{});
    }
    

}

export default new FirebaseService();