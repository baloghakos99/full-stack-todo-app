import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import $ from "jquery";

const URL_BASE = "http://localhost:1999";

function UpdateTodo(props) {
  const [todo, setTodo] = useState("");

  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDes, setNewDes] = useState(todo.description);
  const [date, setDate] = useState(todo.timestamp);
  const [button, setButton] = useState(false);

  // const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo();
    console.log("dew");
  }, []);

  const updateTodo = () => {
    fetch(URL_BASE + `/todos/update/${props.match.params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDes,
        status: "active",
        timestamp: date,
      }),
    }).then((res) => res.json());
  };

  const getTodo = () => {
    fetch(URL_BASE + `/todo/${props.match.params.id}`)
      .then((res) => res.json())
      .then((data) => setTodo(data.todo[0]));
  };

  const updateTitle = (e) => {
    setNewTitle(e.target.value);
    setNewDes(todo.description);
    setDate(todo.timestamp);
    setButton(true);
  };
  const updateDescription = (e) => {
    setNewTitle(todo.title);
    setNewDes(e.target.value);
    setDate(todo.timestamp);
    setButton(true);
  };
  const updateDeadline = (e) => {
    setNewTitle(todo.title);
    setNewDes(todo.description);
    setDate(e.target.value);
    setButton(true);
  };
  $(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var maxDate = year + "-" + month + "-" + day;
    $("#txtDate").attr("min", maxDate);
  });
  return (
    <div className="Home">
      <h1>Update todo</h1>
      <p>Todo title:</p>
      <input
        type="text"
        onChange={(e) => updateTitle(e)}
        defaultValue={todo.title}
      ></input>
      <p>Todo description:</p>
      <textarea
        defaultValue={todo.description}
        onChange={(e) => updateDescription(e)}
        rows="5"
        cols="60"
      ></textarea>
      <p> Deadline:</p>
      <input
        className="date-input"
        defaultValue={todo.timestamp}
        type="date"
        id="txtDate"
        onChange={(e) => updateDeadline(e)}
      ></input>

      <Link to="/">
        <button
          className={button ? "updateButton" : "cantsee"}
          onClick={() => updateTodo()}
        >
          Update Todo
        </button>
      </Link>
    </div>
  );
}

export default UpdateTodo;
