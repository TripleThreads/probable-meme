import Vue from 'vue';
import VueFirestore from 'vue-firestore';
import Firebase from 'firebase';

require('firebase/firestore');

Vue.use(VueFirestore);
let config = {
    apiKey: "AIzaSyCbIkYqsh3iezu2UTwk92Yvh748oZ6YX20",
    authDomain: "mmmm-6cb90.firebaseapp.com",
    databaseURL: "https://mmmm-6cb90.firebaseio.com",
    projectId: "mmmm-6cb90",
    storageBucket: "mmmm-6cb90.appspot.com",
    messagingSenderId: "34296551592",
    appId: "1:34296551592:web:4c5e4daa82534fe0a8ca9d",
    measurementId: "G-T8Y2VEV81V"
};


const firebase = Firebase.initializeApp(config);
export const firestore = firebase.firestore();