import { useState, useEffect } from "react";
import { addList, deleteList, colRef, updateList } from "./lib/firebase";
import { onSnapshot } from "firebase/firestore";
import { populateDB, deleteAll } from "./db/populate-firestore";

function App() {
  const [list, setList] = useState("");
  const [item, setItem] = useState("");
  const [id, setId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [name, setName] = useState("");
  const [docs, setDocs] = useState();

  const getAllDocs = async (id) => {
    try {
      const unsubscribe = onSnapshot(colRef, (snapshot) => {
        const snapshotDocs = [];
        snapshot.forEach((doc, index) => {
          snapshotDocs.push({ ...doc.data(), id: doc.id });
        });
        snapshot.forEach((doc) => {
          console.log(doc.id);
        });
        setDocs(snapshotDocs);
        console.log(snapshotDocs);
        // return () => {
        //   unsubscribe();
        //   console.log("unsubscribed");
        // };
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

  const handleUpdateIDChange = (e) => {
    setUpdateId(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
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

  const updateItem = (e) => {
    e.preventDefault();
    updateList(updateId, name);
    console.log("updated");
  };

  return (
    <main className="main-container">
      <h2 className="title">grocery bud</h2>
      <div className="info-container">
        <div className="forms-container">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                Add list & items <small>(separated by a whitespace)</small>
              </legend>
              <label htmlFor="list-name">List name</label>
              <br />
              <input
                type="text"
                placeholder="e.g. maria's list"
                value={list}
                onChange={handleListChange}
                name="list-name"
              />
              <br />
              <label htmlFor="items">Items</label>
              <br />
              <input
                type="text"
                placeholder="e.g. broccoli"
                value={item}
                onChange={handleItemsChange}
                name="items"
              />
              <br />
              <button type="submit" className="submit-btn">
                submit
              </button>
            </fieldset>
          </form>
          <form onSubmit={deleteItem}>
            <fieldset>
              <legend>Delete list by ID</legend>
              <label htmlFor="id">ID</label>
              <br />
              <input
                type="text"
                value={id}
                onChange={handleIDChange}
                name="id"
              />
              <br />
              <button type="submit" className="submit-btn">
                submit
              </button>
            </fieldset>
          </form>
          <form onSubmit={updateItem}>
            <fieldset>
              <legend>Update list by ID</legend>
              <label htmlFor="id">ID</label>
              <br />
              <input
                type="text"
                value={updateId}
                onChange={handleUpdateIDChange}
                name="id"
              />
              <br />
              <label htmlFor="name ">Name</label>
              <br />
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                name="name"
              />
              <br />
              <button type="submit" className="submit-btn">
                submit
              </button>
            </fieldset>
          </form>
        </div>
        <article className="list-container">
          {docs &&
            docs.map((doc) => {
              const { name, items, id } = doc;
              return (
                <div key={id} className="list-item">
                  <p className="list-title">{name}</p>
                  <ul className="list-items">
                    {items.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                  <div className="btn-container">
                    <button
                      className="delete-btn"
                      type="button"
                      onClick={() => {
                        setId(id);
                        deleteList(id);
                        setId("");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </article>
      </div>
      <button className="populate-btn" onClick={populateDB}>
        populate
      </button>
      <button className="delete-all-btn" onClick={deleteAll}>
        delete all
      </button>
    </main>
  );
}

export default App;
