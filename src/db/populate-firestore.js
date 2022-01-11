import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
const data = require("./lists-data.json");

const firebaseConfig = {
  apiKey: "AIzaSyCmIdkVcbE98dhSnn5JZq2Q0zJuuYqjvuw",
  authDomain: "shopping-list-bbd0f.firebaseapp.com",
  projectId: "shopping-list-bbd0f",
  storageBucket: "shopping-list-bbd0f.appspot.com",
  messagingSenderId: "858596886326",
  appId: "1:858596886326:web:aeff343b07523cc0c89597",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "lists");

const addList = async (item) => {
  const { name, items } = item;
  try {
    await addDoc(colRef, {
      name,
      items,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

const querySnapshot = async () => {
  const ids = [];
  const docs = await getDocs(colRef);
  docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    ids.push(doc.id);
  });
  return ids;
};

export const populateDB = () => {
  if (querySnapshot() === []) {
    return;
  }
  data.forEach((item) => {
    addList(item);
  });
};

const deleteByID = async (id) => {
  const docRef = doc(db, "lists", id);
  await deleteDoc(docRef);
  console.log(`document ${id} deleted.`);
};

export const deleteAll = async () => {
  const ids = await querySnapshot();
  ids.forEach((id) => {
    deleteByID(id);
  });

  // try {
  //   const docRef = doc(db, "lists", id);
  //   await deleteDoc(docRef);
  //   console.log(`document ${id} deleted.`);
  // } catch (error) {
  //   console.log(error);
  // }
};
