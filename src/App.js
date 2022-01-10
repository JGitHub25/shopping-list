import { useState } from "react";

function App() {
  const [task, setTask] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="main-container">
      <h2 className="title">grocery bud</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. broccoli"
            value={task}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            submit
          </button>
        </div>
      </form>
      <article>list</article>
    </main>
  );
}

export default App;
