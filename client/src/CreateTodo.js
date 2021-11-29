import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import $ from "jquery";
const URL_BASE = "http://localhost:1999";

function CreateTodo() {
  const [newTitle, setNewTitle] = useState("Todo title");
  const [newDes, setNewDes] = useState("Todo description");
  const [date, setDate] = useState("You can do it whenewer you want");

  const createTodo = async () => {
    const data = await fetch(URL_BASE + "/todos", {
      method: "POST",
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
      <h1>Add new todo</h1>
      <p>Todo title:</p>
      <input
        type="text"
        onChange={(e) => setNewTitle(e.target.value)}
        defaultValue={newTitle}
      ></input>
      <p>Todo description:</p>
      <textarea
        onChange={(e) => setNewDes(e.target.value)}
        rows="5"
        cols="60"
        defaultValue={newDes}
      ></textarea>
      <p> Deadline:</p>
      <input
        id="txtDate"
        className="date-input"
        type="date"
        onChange={(e) => setDate(e.target.value)}
      ></input>

      <Link to="/">
        <button onClick={() => createTodo()}>Create Todo</button>
      </Link>
    </div>
  );
}

export default CreateTodo;
