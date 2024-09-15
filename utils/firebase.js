import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyARR18HKqCeTH907bzyE9LGfMIS1oqRDN4",
  authDomain: "ecommerce-7830a.firebaseapp.com",
  projectId: "ecommerce-7830a",
  storageBucket: "ecommerce-7830a.appspot.com",
  messagingSenderId: "25189387719",
  appId: "1:25189387719:web:3a132bd744dad2bf901de2",
  measurementId: "G-B90VDSVSKR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };