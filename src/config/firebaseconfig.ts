// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCiCiSpgn_GVl_pNNl0A2sqN1ChW05mAA",
  authDomain: "tnp-image-storage.firebaseapp.com",
  projectId: "tnp-image-storage",
  storageBucket: "tnp-image-storage.appspot.com",
  messagingSenderId: "441123900971",
  appId: "1:441123900971:web:03e01cb9fabafa3bbc646e",
  measurementId: "G-CKE9GTZVGH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
