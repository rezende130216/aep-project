import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';	

const firebaseConfig = {
    apiKey: "AIzaSyC-4q6xlekEDNUtq3WxZkgjGC6lJ6UAh3c",
    authDomain: "aep-bd.firebaseapp.com",
    projectId: "aep-bd",
    storageBucket: "aep-bd.appspot.com",
    messagingSenderId: "159007044342",
    appId: "1:159007044342:web:c6b0ac665a95c7c81d72d7",
    measurementId: "G-D28HX6WFM3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};