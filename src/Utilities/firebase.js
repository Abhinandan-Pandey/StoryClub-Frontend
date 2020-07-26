import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzOU2zSdEfJJ2fBMR3piZK9jH_q6g9nPQ",
  authDomain: "storyclub-734f8.firebaseapp.com",
  databaseURL: "https://storyclub-734f8.firebaseio.com",
  projectId: "storyclub-734f8",
  storageBucket: "storyclub-734f8.appspot.com",
  messagingSenderId: "711083344387",
  appId: "1:711083344387:web:254d76e701958f3b45c436",
  measurementId: "G-6ST820T6GL",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage=firebase.storage()

export {
    storage,firebase as default
};