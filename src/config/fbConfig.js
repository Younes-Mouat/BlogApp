import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey : " AIzaSyDMHokr26vOaJOP73NKoSoqYbZ4VCHN5hk " ,
    authDomain :"mouatamir-younes-blogapp.firebaseapp.com" , 
    databaseURL : "https://mouatamir-younes-blogapp.firebaseio.com" ,
    projectId : "mouatamir-younes-blogapp" ,
    storageBucket : "mouatamir-younes-blogapp.appspot.com" ,
    messagingSenderId : " 1039892191821 " ,
    appId : " 1: 1039892191821: web: d9a70e1aa6d75afbe4da04 " ,
    measurementId : " G-E7JZTB0N3Y " ,
    userProfile: "users"
};

firebase.initializeApp(config); 
//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;