import firebase from "firebase";
// Required for side-effects
require("firebase/firestore");

class FirebaseService {

    constructor() {
        const config = {
            apiKey: "AIzaSyDf9b3kU24eS5EsHo9ICBkkDO3v-cMvm-8",
            authDomain: "devnexus-2019.firebaseapp.com",
            databaseURL: "https://devnexus-2019.firebaseio.com",
            projectId: "devnexus-2019",
            storageBucket: "devnexus-2019.appspot.com",
            messagingSenderId: "87686152244"
        };

        firebase.initializeApp(config);

        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.db.enablePersistence()
            .catch(function(err) {
               console.log(err)
            });

        this.auth.onAuthStateChanged(
            
            (user) => {
                console.log("User state changed in service");
                if (user) {
                    this.db.collection("users").doc(user.uid).set(
                        {
                            displayName:user.displayName,
                            email: user.email
                        }, { merge: true }
                    ).then(()=>console.log("User info updated in firestore"))
                     .catch((err)=> console.log(err));
                }
            }
        );

        this.submitFeedback = this.submitFeedback.bind(this);

    }

    submitFeedback(trackTitle, rating) {
        var user = firebase.auth().currentUser;
        if (user) {
            this.db.collection("users").doc(user.uid).update(
                new firebase.firestore.FieldPath("feedback", trackTitle),
                rating
            ).then(()=>console.log("User info updated in firestore"))
            .catch((err)=> console.log(err));
        } else {
            console.log("Do not add feedback if the user is not logged in.")
        }
    }
    

}

export default new FirebaseService();