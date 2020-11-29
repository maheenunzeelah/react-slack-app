import firebase from 'firebase/app';
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyDNiYhX-i68WOPI2fqfCmzFEe89yXjnu9s",
    authDomain: "react-chat-app-ebe3d.firebaseapp.com",
    databaseURL: "https://react-chat-app-ebe3d.firebaseio.com",
    projectId: "react-chat-app-ebe3d",
    storageBucket: "react-chat-app-ebe3d.appspot.com",
    messagingSenderId: "335174948068",
    appId: "1:335174948068:web:81e47c217f6f839a8388f1",
    measurementId: "G-S4K70S69FQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;