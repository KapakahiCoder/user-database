import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWnXZTtTnZ5fGZvY5qKo9E3d5_hH1ZmTs",
  authDomain: "user-database-84d38.firebaseapp.com",
  projectId: "user-database-84d38",
  storageBucket: "user-database-84d38.appspot.com",
  messagingSenderId: "774319113321",
  appId: "1:774319113321:web:7f7883749adc2400ac4ef8",
};

//init firebase and connect to the backend
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
