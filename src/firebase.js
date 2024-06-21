import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAtJzdGGxiNKheB2RkWUXcZnDRWlgo2rQM",
  authDomain: "mymusic-8500.firebaseapp.com",
  projectId: "mymusic-8500",
  storageBucket: "mymusic-8500.appspot.com",
  messagingSenderId: "650160732588",
  appId: "1:650160732588:web:3079571ddc466d86826209",
  measurementId: "G-80LXWMP43H"
};
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;
