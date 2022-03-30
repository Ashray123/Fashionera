import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config ={
    apiKey: "AIzaSyA267TJtzDLAHYVmCEcPngvQ9q5htLbWcE",
    authDomain: "fashionera-8d010.firebaseapp.com",
    databaseURL: "https://fashionera-8d010.firebaseio.com",
    projectId: "fashionera-8d010",
    storageBucket: "fashionera-8d010.appspot.com",
    messagingSenderId: "285391670820",
    appId: "1:285391670820:web:4f1ae88f4e378d421e12b1",
    measurementId: "G-E4VVHTRWHF"


};

firebase.initializeApp(config);

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
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  

export const auth = firebase.auth();
 export const firestore=firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account' });
export const signInWithGoogle =() => auth.signInWithPopup(provider);
 
export default firebase;
