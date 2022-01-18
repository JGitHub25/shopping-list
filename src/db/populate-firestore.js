import {
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { colRef } from "../lib/firebase";
const data = require("./lists-data.json");

const getIDs = async () => {
  const ids = [];
  const docs = await getDocs(colRef);
  docs.forEach((doc) => {
    ids.push(doc.id);
  });
  return ids;
};

const createList = async (data) => {
  const { name, items } = data;
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

export const populateDB = async () => {
  const dbStatus = await getIDs();

  if (dbStatus.length === 0) {
    data.forEach((item) => {
      createList(item);
    });
  }
};

const deleteByID = async (id) => {
  const docRef = doc(colRef, id);
  await deleteDoc(docRef);
  console.log(`document ${id} deleted.`);
};

export const deleteAll = async () => {
  const ids = await getIDs();
  ids.forEach((id) => {
    deleteByID(id);
  });
};
