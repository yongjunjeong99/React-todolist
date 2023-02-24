import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [newtodo, setNewToDo] = useState("");
  // 날짜
  const date = new Date();
  const dateArray = {
    year: date.getFullYear(),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
    week: date.getDay(),
  };
  const weekChangeText = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const onsubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
    }
  };

  const insertHandler = (event) => {
    setTodo(event.target.value);
  };

  const addToDoHandler = () => {
    if (todo === "") {
      return;
    }
    const newItem = {
      content: todo,
      modify: true,
      checked: false,
    };

    setList([...list, newItem]);
    setTodo("");
  };

  const deleteHandler = (index) => {
    const newList = list.filter((item, number) => index !== number);
    setList(newList);
  };

  const modifyHandler = (index, content) => {
    const modifyList = list.map((item, number) =>
      index === number ? { ...item, modify: false } : { ...item, modify: true }
    );
    setList(modifyList);
    setNewToDo(content);
  };

  const modifyInput = (event) => {
    setNewToDo(event.target.value);
  };

  const modifySave = (index) => {
    if (newtodo === "") {
      return;
    }
    const modifytodo = list.map((item, number) =>
      index === number
        ? { ...item, content: newtodo, modify: true }
        : { ...item }
    );

    setList(modifytodo);
  };

  return (
    <div className="App">
      <div className="inner">
        <h3 className="date">
          {dateArray.year}.{dateArray.month}.{dateArray.day}
        </h3>
        <h2 className="week">{weekChangeText[dateArray.week]}</h2>
        <h1 className="title">Have a Good Day</h1>
        <ul className="toDoList">
          {list.map((item, index) => (
            <li key={index}>
              <form onSubmit={onsubmit}>
                {item.modify ? (
                  <div className="item">✔️ {item.content}</div>
                ) : (
                  <input
                    placeholder="Modify..."
                    className="modifyInput"
                    type="text"
                    onChange={modifyInput}
                    value={newtodo}
                    autoFocus
                  />
                )}
                <ul className="btnWrap">
                  <li>
                    {item.modify ? (
                      <button
                        onClick={() => modifyHandler(index, item.content)}
                      >
                        ✍️
                      </button>
                    ) : (
                      <button onClick={() => modifySave(index)}>⭕</button>
                    )}
                  </li>
                  <li>
                    <button onClick={() => deleteHandler(index)}>❌</button>
                  </li>
                </ul>
              </form>
            </li>
          ))}
        </ul>
        <form onSubmit={onsubmit}>
          <div className="addBox">
            <input
              className="input"
              placeholder="add a new todo"
              value={todo}
              onChange={insertHandler}
              autoFocus
            />
            <button className="addBtn" onClick={addToDoHandler}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
