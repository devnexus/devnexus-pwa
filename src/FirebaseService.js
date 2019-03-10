/*import firebase from "firebase/app";*/
import "firebase/auth"
import "firebase/firestore";


class FirebaseService {

    constructor() {
        // const config = {
        //     apiKey: "AIzaSyDf9b3kU24eS5EsHo9ICBkkDO3v-cMvm-8",
        //     authDomain: "devnexus-2019.firebaseapp.com",
        //     databaseURL: "https://devnexus-2019.firebaseio.com",
        //     projectId: "devnexus-2019",
        //     storageBucket: "devnexus-2019.appspot.com",
        //     messagingSenderId: "87686152244"
        // };

        // firebase.initializeApp(config);

        // this.auth = firebase.auth();
        // this.db = firebase.firestore();
        // this.db.enablePersistence()
        //     .catch(function(err) {
        //         /* eslint-disable-next-line no-console */
        //        console.log(err)
        //     });

        // this.auth.onAuthStateChanged(
            
        //     (user) => {
        //         if (user) {
        //             this.db.collection("users").doc(user.uid).set(
        //                 {
        //                     displayName:user.displayName,
        //                     email: user.email
        //                 }, { merge: true }
        //             ).then(()=>{})
        //             /* eslint-disable-next-line no-console */
        //              .catch((err)=> console.log(err));
        //         }
        //     }
        // );
        this.submitFeedback = this.submitFeedback.bind(this);
    }

    submitFeedback(/*trackTitle, feedback, rating*/) {
        // var user = firebase.auth().currentUser;
        // if (user) {
        //     return this.db.collection("users").doc(user.uid).update(
        //         new firebase.firestore.FieldPath("feedback", trackTitle),
        //         {
        //             comment: feedback,
        //             score: rating
        //         }
        //     ).then(()=>{})
        //     /* eslint-disable-next-line no-console */
        //     .catch((err)=> console.log(err));
        // } else {
        //     /* eslint-disable-next-line no-console */
        //     console.log("Do not add feedback if the user is not logged in.")
        //     return new Promise(()=>{});
        // }
        return new Promise(()=>{});
    }
    

}

export default new FirebaseService();