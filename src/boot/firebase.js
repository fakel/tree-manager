import Vue from 'vue';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAA2uoOw--P7s6bvFLzw2jhvifQuhmLFHo',
  authDomain: 'patanemo-tree-manager.firebaseapp.com',
  databaseURL: 'https://patanemo-tree-manager.firebaseio.com',
  projectId: 'patanemo-tree-manager',
  storageBucket: 'patanemo-tree-manager.appspot.com',
  messagingSenderId: '348292456688',
  appId: '1:348292456688:web:302935b7a03464b6c66235',
  measurementId: 'G-YW6LMZGMD1',
};

firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase;
Vue.prototype.$auth = firebase.auth;
Vue.prototype.$db = firebase.firestore;
