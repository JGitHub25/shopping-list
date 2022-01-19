import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
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

const frequencies = ["soon", "kind of soon", "not soon"];
const randomFrequency = () => {
  const random = Math.floor(Math.random() * frequencies.length);
  return frequencies[random];
};

export const addList = async (name, items) => {
  try {
    const itemsArray = items.split(" ").map((item) => {
      return {
        name: item,
        howSoon: randomFrequency(),
        lastPurch: new Date().toLocaleString(),
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

export const AddToListById = async (id, product) => {
  const fullItem = {
    name: product,
    howSoon: randomFrequency(),
    lastPurch: new Date().toLocaleString(),
  };

  try {
    const docRef = doc(colRef, id);
    await updateDoc(docRef, { items: arrayUnion(fullItem) });
    console.log(`document ${id} updated.`);
  } catch (error) {
    console.log(error);
  }
};
