import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBgbInpWRpISQ9lZTHg03djMUnnOPaK1mk",
    authDomain: "crwn-db-a7d7a.firebaseapp.com",
    projectId: "crwn-db-a7d7a",
    storageBucket: "crwn-db-a7d7a.appspot.com",
    messagingSenderId: "23035476785",
    appId: "1:23035476785:web:ad505f71c5e0ecb3304e10",
    measurementId: "G-3E4CW3ZR8G"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;