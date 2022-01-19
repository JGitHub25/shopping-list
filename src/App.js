import { useState, useEffect, useRef } from "react";
import { addList, deleteDocById, colRef, AddToListById } from "./lib/firebase";
import { onSnapshot } from "firebase/firestore";
import { populateDB, deleteAll } from "./db/populate-firestore";

function App() {
  // const [dbLists, setDbLists] = useState([]);
  const allDocsRef = useRef([]);
  const [inputs, setInputs] = useState({
    items: [],
    itemsForNewList: "",
    list: "",
    product: "",
    id: "",
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
      allDocsRef.current = snapshotDocs;
      // setDbLists(snapshotDocs);
      console.log(snapshotDocs);
    });
    return () => {
      unsubscribe();
      console.log("unsubscribed");
    };
  }, []);

  const handleSelect = (e) => {
    const select = e.target;
    const id = select.options[select.selectedIndex].id;
    const doc = allDocsRef.current.find((doc) => {
      return doc.id === id;
    });
    const filteredItems = [];
    doc.items.forEach((item) => {
      filteredItems.push(item.name);
    });
    setInputs((values) => ({
      ...values,
      name: select.value,
      id,
      items: filteredItems,
    }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleAddListSubmit = (e) => {
    e.preventDefault();
    addList(inputs.list, inputs.product);
    setInputs((values) => ({ ...values, list: "", product: "" }));
  };

  const deleteOneList = (e) => {
    e.preventDefault();
    deleteDocById(inputs.id);
    setInputs((values) => ({ ...values, id: "" }));
  };

  const deleteThisList = (e) => {
    const { id } = e.target.parentNode.parentNode;

    deleteDocById(id);
  };

  const handleAddition = (e) => {
    e.preventDefault();
    AddToListById(inputs.id, inputs.product);
    setInputs((values) => ({ ...values, product: "" }));
  };

  return (
    <main className="main-container">
      <h2 className="title">grocery bud</h2>
      <div className="info-container">
        <div className="forms-container">
          <form onSubmit={handleAddition}>
            <fieldset>
              <legend>Choose an existing list</legend>
              <label htmlFor="name">Choose your user from the list:</label>
              <br />
              {allDocsRef.current === [] ? (
                <small>There are no lists yet</small>
              ) : (
                <select
                  id="name"
                  onChange={handleSelect}
                  name="name"
                  value={inputs.name}
                >
                  {allDocsRef.current.map((doc) => {
                    const { id, name } = doc;
                    return (
                      <option key={id} id={id} value={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              )}
              <fieldset>
                <legend>Add a product to your list</legend>
                <label htmlFor="name ">Product</label>
                <br />
                <input
                  type="text"
                  value={inputs.product}
                  onChange={handleChange}
                  name="product"
                />
                <br />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </fieldset>
            </fieldset>
          </form>
          <form onSubmit={handleAddListSubmit}>
            <fieldset>
              <legend>
                Create list & items <small>(separated by a whitespace)</small>
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
              <label htmlFor="items">Items to include</label>
              <br />
              <input
                type="text"
                placeholder="e.g. broccoli"
                value={inputs.itemsForNewList}
                onChange={handleChange}
                name="items"
              />
              <br />
              <button type="submit" className="create-btn">
                create
              </button>
            </fieldset>
          </form>
          <form onSubmit={deleteOneList}>
            <fieldset>
              <button type="submit" className="delete-btn">
                delete
              </button>
            </fieldset>
          </form>
        </div>
        <article className="list-container">
          {inputs.items === [] ? null : (
            <div id={inputs.id} className="list-item">
              <p className="list-title">{inputs.name}</p>
              <ul className="list-items">
                {inputs.items.map((item) => {
                  return <li key={`${item}${inputs.id}`}>{item}</li>;
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
          )}
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
