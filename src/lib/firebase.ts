// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqyoT8tQwtJV3u1FmWUZ5nivdBq4Ww6mQ",
  authDomain: "authentication-887b8.firebaseapp.com",
  projectId: "authentication-887b8",
  storageBucket: "authentication-887b8.appspot.com",
  messagingSenderId: "115431732996",
  appId: "1:115431732996:web:6a91868402a5441bef8251"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};
