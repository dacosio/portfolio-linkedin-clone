import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAr2R53pqB4dflJAw_IG_jXdgsdpKfQJa8",
    authDomain: "linkedin-clone-b50af.firebaseapp.com",
    projectId: "linkedin-clone-b50af",
    storageBucket: "linkedin-clone-b50af.appspot.com",
    messagingSenderId: "394627878967",
    appId: "1:394627878967:web:346de5924a974bd3a76fb2",
    measurementId: "G-QC942RQWRV"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);

export { auth, db };