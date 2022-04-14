import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAyZ0cU8MbC2lgd42W2nG3Vh0mIU248yM",
  authDomain: "crwn-db-3752e.firebaseapp.com",
  projectId: "crwn-db-3752e",
  storageBucket: "crwn-db-3752e.appspot.com",
  messagingSenderId: "639238703690",
  appId: "1:639238703690:web:c8a157c88e4e2b060834b3",
  measurementId: "G-VND5FCGF55",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
