import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAS00ZUT4tK6joJfFP1ehwxXDjaXXKKh5E",
    authDomain: "linkedin-3302a.firebaseapp.com",
    projectId: "linkedin-3302a",
    storageBucket: "linkedin-3302a.appspot.com",
    messagingSenderId: "1031525218009",
    appId: "1:1031525218009:web:fb23ee4bba5298542530c8"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();      // database
 const auth = firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider();
 const storage  = firebase.storage();

export{auth,provider,storage};
export default db;