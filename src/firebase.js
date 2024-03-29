import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB7Cu-GWrg_rvsCuaK97LYjrCWqiYSFFV4",
  authDomain: "mind-care-b5645.firebaseapp.com",
  projectId: "mind-care-b5645",
  storageBucket: "mind-care-b5645.appspot.com",
  messagingSenderId: "787729662770",
  appId: "1:787729662770:web:86ee0c09231f54934d8d2b",
  measurementId: "G-PZF7S3ZX2K"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db =getFirestore(app)