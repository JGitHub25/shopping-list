import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmIdkVcbE98dhSnn5JZq2Q0zJuuYqjvuw",
  authDomain: "shopping-list-bbd0f.firebaseapp.com",
  projectId: "shopping-list-bbd0f",
  storageBucket: "shopping-list-bbd0f.appspot.com",
  messagingSenderId: "858596886326",
  appId: "1:858596886326:web:aeff343b07523cc0c89597",
};

// init firebase
export const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore();

// collection ref
export const colRef = collection(db, "lists");

export const addList = async (name, items) => {
  try {
    const itemsArray = items.split(" ").map((item) => {
      return {
        name: item,
        howSoon: "soon",
        lastPurch: new Date(),
      };
    });
    await addDoc(colRef, {
      name,
      items: itemsArray,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocById = async (id) => {
  try {
    const docRef = doc(colRef, id);
    await deleteDoc(docRef);
    console.log(`document ${id} deleted.`);
  } catch (error) {
    console.log(error);
  }
};

export const updateList = async (id, name) => {
  try {
    const docRef = doc(colRef, id);
    await updateDoc(docRef, { name });
    console.log(`document ${id} updated.`);
  } catch (error) {
    console.log(error);
  }
};
