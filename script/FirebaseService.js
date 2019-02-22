import firebase from "firebase";

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

    }
}

export default new FirebaseService();