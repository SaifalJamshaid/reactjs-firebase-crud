import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";


var firebaseConfig = {
  apiKey: "AIzaSyDT0YW8OTC2XvsZROw0lIG66K2KFXG09Xc",
  authDomain: "react-item.firebaseapp.com",
  databaseURL: "https://react-item-default-rtdb.firebaseio.com/",
  projectId: "react-item",
  storageBucket: "react-item.appspot.com",
  messagingSenderId: "563402879970",
  appId: "1:563402879970:web:467558217acb1d33c5bfbb",
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };

export default fireDb.database().ref();
