// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB5RuoWygPR4JI15v56_Hho9oLytkBAXU",
  authDomain: "newsearch-32861.firebaseapp.com",
  projectId: "newsearch-32861",
  storageBucket: "newsearch-32861.appspot.com",
  messagingSenderId: "658599408614",
  appId: "1:658599408614:web:bbf559ba561100a8299c27",
  measurementId: "G-DHL6C1XTRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);