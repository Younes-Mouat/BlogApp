import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var fbConfig = {
    apiKey: "AIzaSyATHXwS9-HXlBAXMNmLInMe7r8p9wBJGBo",
    authDomain: "mouatamir-younes-chatroom.firebaseapp.com",
    databaseURL: "https://mouatamir-younes-chatroom.firebaseio.com",
    projectId: "mouatamir-younes-chatroom",
    storageBucket: "mouatamir-younes-chatroom.appspot.com",
    messagingSenderId: "582703011973",
    appId: "1:582703011973:web:4b4a701a5811f61a7171ec"
};

// Initialize Firebase
firebase.initializeApp(fbConfig);
//firebase.firestore().settings({timestampsInSnapshots: true});

export default fbConfig