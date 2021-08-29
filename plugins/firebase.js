import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHOcsA09ivVuUtw0gip_Nop5qM80X5Uds",
  authDomain: "nuxttest-4aa01.firebaseapp.com",
  projectId: "nuxttest-4aa01",
  storageBucket: "nuxttest-4aa01.appspot.com",
  messagingSenderId: "384832752988",
  appId: "1:384832752988:web:ab26c175ea05cd8a4b0599"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// console.log(firebaseApp);
// eslint-disable-next-line no-undef
const db = getFirestore(firebaseApp);

// eslint-disable-next-line no-undef
// const storage = firebase.storage()

const testCollection = collection(db, "test");

export { db, testCollection };
