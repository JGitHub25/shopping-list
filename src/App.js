import { useState, useEffect } from "react";
import { addList, deleteDocById, colRef, updateList } from "./lib/firebase";
import { onSnapshot } from "firebase/firestore";
import { populateDB, deleteAll } from "./db/populate-firestore";

function App() {
  const [docs, setDocs] = useState([]);
  const [inputs, setInputs] = useState({
    items: "",
    list: "",
    product: "",
    deleteId: "",
    updateId: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const snapshotDocs = [];
      snapshot.forEach((doc) => {
        snapshotDocs.push({ ...doc.data(), id: doc.id });
      });
      snapshot.forEach((doc) => {
        console.log(doc.id);
      });
      setDocs(snapshotDocs);
      console.log(snapshotDocs);
    });
    return () => {
      unsubscribe();
      console.log("unsubscribed");
    };
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleAddListSubmit = (e) => {
    e.preventDefault();
    addList(inputs.list, inputs.items);
    setInputs((values) => ({ ...values, list: "", items: "" }));
  };

  const deleteOneList = (e) => {
    e.preventDefault();
    deleteDocById(inputs.deleteId);
    setInputs((values) => ({ ...values, deleteId: "" }));
  };

  const deleteThisList = (e) => {
    const { id } = e.target.parentNode.parentNode;

    deleteDocById(id);
  };

  const updateItem = (e) => {
    e.preventDefault();
    console.log("updated");
  };

  return (
    <main className="main-container">
      <h2 className="title">grocery bud</h2>
      <div className="info-container">
        <div className="forms-container">
          <form>
            <fieldset>
              <legend>Choose an existing list</legend>
              <label htmlFor="userList">Choose your user from the list:</label>
              <br />
              <select
                id="users"
                onChange={handleChange}
                name="user"
                value={inputs.user}
              >
                {docs.map((doc) => {
                  const { id, name } = doc;
                  return (
                    <option key={id} id={id} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </fieldset>
          </form>
          <form onSubmit={handleAddListSubmit}>
            <fieldset>
              <legend>
                Add list & items <small>(separated by a whitespace)</small>
              </legend>
              <label htmlFor="list-name">List name</label>
              <br />
              <input
                type="text"
                placeholder="e.g. maria's list"
                value={inputs.list}
                onChange={handleChange}
                name="list"
              />
              <br />
              <label htmlFor="items">Items</label>
              <br />
              <input
                type="text"
                placeholder="e.g. broccoli"
                value={inputs.items}
                onChange={handleChange}
                name="items"
              />
              <br />
              <button type="submit" className="submit-btn">
                submit
              </button>
            </fieldset>
          </form>
          <form onSubmit={deleteOneList}>
            <fieldset>
              <legend>Delete list by ID</legend>
              <label htmlFor="id">ID</label>
              <br />
              <input
                type="text"
                value={inputs.deleteId}
                onChange={handleChange}
                name="deleteId"
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
                value={inputs.updateId}
                onChange={handleChange}
                name="updateId"
              />
              <br />
              <label htmlFor="name ">Product</label>
              <br />
              <input
                type="text"
                value={inputs.product}
                onChange={handleChange}
                name="product"
              />
              <br />
              <button type="submit" className="submit-btn">
                submit
              </button>
            </fieldset>
          </form>
        </div>
        <article className="list-container">
          {docs.map((doc) => {
            const { name, items, id } = doc;
            return (
              <div key={id} id={id} className="list-item">
                <p className="list-title">{name}</p>
                <ul className="list-items">
                  {items.map((item) => {
                    const { name } = item;
                    return <li key={`${name}${id}`}>{name}</li>;
                  })}
                </ul>
                <div className="btn-container">
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={deleteThisList}
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
        populate when empty
      </button>
      <button className="delete-all-btn" onClick={deleteAll}>
        delete all
      </button>
    </main>
  );
}

export default App;
