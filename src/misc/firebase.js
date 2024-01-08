import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
  apiKey: "AIzaSyD7oiEzvLiG_ugnzRvyIMUAcnY5bxzY6hw",
  authDomain: "chat-web-app-704c2.firebaseapp.com",
  databaseURL: "https://chat-web-app-704c2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-web-app-704c2",
  storageBucket: "chat-web-app-704c2.appspot.com",
  messagingSenderId: "220592644047",
  appId: "1:220592644047:web:b4a71cbd6fda43b9a03cba"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();

