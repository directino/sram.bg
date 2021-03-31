import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAV1vvv4AIB5NXDTpS2PK_DltP6DyzZXxQ",
  authDomain: "sram-bg.firebaseapp.com",
  databaseURL: "https://sram-bg-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sram-bg",
  storageBucket: "sram-bg.appspot.com",
  messagingSenderId: "939446036718",
  appId: "1:939446036718:web:9432b085e97bffb37f2bff"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const db = firebaseApp.database();
const storage = firebaseApp.storage();
export { auth, storage, db, firebaseApp as default };