import { useState, useEffect } from "react";
import { addList, deleteList, colRef } from "./lib/firebase";
import { onSnapshot } from "firebase/firestore";

function App() {
  const [list, setList] = useState("");
  const [item, setItem] = useState("");
  const [id, setId] = useState("");
  const [docs, setDocs] = useState(["a", "b"]);

  const getAllDocs = async (id) => {
    try {
      const unsubscribe = onSnapshot(colRef, (snapshot) => {
        const snapshotDocs = [];
        snapshot.forEach((doc) => snapshotDocs.push(doc.data()));
        setDocs(snapshotDocs);
        console.log(snapshotDocs);
        return () => {
          unsubscribe();
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDocs();
  }, []);

  const handleListChange = (e) => {
    setList(e.target.value);
  };
  const handleItemsChange = (e) => {
    setItem(e.target.value);
  };

  const handleIDChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addList(list, item);
    setList("");
    setItem("");
  };

  const deleteItem = (e) => {
    e.preventDefault();
    deleteList(id);
    setId("");
  };

  return (
    <main className="main-container">
      <h2 className="title">grocery bud</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="list-name">List name</label>
          <input
            type="text"
            placeholder="e.g. maria's list"
            value={list}
            onChange={handleListChange}
            name="list-name"
          />
          <label htmlFor="items">Items</label>
          <input
            type="text"
            placeholder="e.g. broccoli"
            value={item}
            onChange={handleItemsChange}
            name="items"
          />
          <button type="submit" className="submit-btn">
            submit
          </button>
        </div>
      </form>
      <form onSubmit={deleteItem}>
        <label htmlFor="id">ID</label>
        <input type="text" value={id} onChange={handleIDChange} name="id" />
        <button type="submit" className="submit-btn">
          submit
        </button>
      </form>
      <article>list</article>
      <div>
        {docs.map((doc, index) => {
          return <div key={index}>{doc.name}</div>;
        })}
      </div>
    </main>
  );
}

export default App;
