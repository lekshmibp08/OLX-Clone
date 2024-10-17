import firebase from "firebase";
import 'firebase/auth'              //authentication using email and password
import 'firebase/firebase'          //to store form values
import 'firebase/storage'           //to store files


const firebaseConfig = {
  apiKey: "AIzaSyDPGPTgDsv8sYUx-lyiV1ngOaBe7b67kbY",
  authDomain: "olx-clone-92519.firebaseapp.com",
  projectId: "olx-clone-92519",
  storageBucket: "olx-clone-92519.appspot.com",
  messagingSenderId: "1054035148404",
  appId: "1:1054035148404:web:80fe1232479785e3dcdb21",
  measurementId: "G-RLPVNGWMHS"
};

export default firebase.initializeApp(firebaseConfig)