import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyArjt6ZiJNPVdYD2cUyXNmqw6RCn-dsOpU",
  authDomain: "blogapp-af969.firebaseapp.com",
  projectId: "blogapp-af969",
  storageBucket: "blogapp-af969.appspot.com",
  messagingSenderId: "603814213454",
  appId: "1:603814213454:web:03b2f0bfb86a4e74cd901f"
};

const app = initializeApp(firebaseConfig);

const provider= new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoole = async()=>{
let user=null;
await signInWithPopup(auth,provider)
.then((result)=>{
    user=result.user
})
.catch((err)=>{
    console.log(err)
})
return user;
}