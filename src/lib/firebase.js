import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
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

// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     console.log(snapshot.docs);
//     let lists = [];
//     snapshot.docs.forEach((doc) => {
//       lists.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(lists);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const getAllDocs = async () => {
  const docs = getDocs(colRef);
  docs.forEach((doc) => {});
};

const querySnapshot = async () => {
  try {
    const collectionDocs = await getDocs(colRef);

    collectionDocs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.log(error);
  }
};
querySnapshot();

export const addList = async (name, items) => {
  try {
    const itemsArray = items.split(" ");
    await addDoc(colRef, {
      name,
      items: itemsArray,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = async (id) => {
  try {
    const docRef = doc(db, "lists", id);
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

// useEffect(() => { const unsubscribe = onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
// Firestore requires that you loop through the snapshot to access the docs, // instead of just setting the snapshot as the value of the state const snapshotDocs = [] snapshot.forEach(doc => snapshotDocs.push(doc)) setDocs(snapshotDocs) }) return () => { // Used to remove the snapshot listener when the component is unmounted unsubscribe(); } }, [])
// collection ref

// const q = query(colRef, orderBy("name", "desc"), limit(5));
// const queryCollection = async () => {
//   let sortedResults = [];
//   const results = await getDocs(q);
//   results.forEach((doc) => {
//     sortedResults.push(doc.data());
//   });
//   console.log(sortedResults);
// };

// queryCollection();

// onSnapshot(q, (snapshot) => {
//   let books = [];
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(books);
// });

// const docRef = doc(colRef, "zWMs1yYiGvVH7RFfb6nr");

// onSnapshot(docRef, (snapDoc) => {
//   console.log(snapDoc.data(), snapDoc.id);
// });
