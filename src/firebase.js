import { initializeApp } from 'firebase/app'
import { 
    getFirestore
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBFcWhI0gm1GKstZK_FIAmj6jF7fzp-6Yo",
    authDomain: "tutorial-d1a4d.firebaseapp.com",
    projectId: "tutorial-d1a4d",
    storageBucket: "tutorial-d1a4d.appspot.com",
    messagingSenderId: "243164879801",
    appId: "1:243164879801:web:6a78ae31d289e852a07468"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

