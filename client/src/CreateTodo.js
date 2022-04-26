import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const onSetDate = (data) => {
    console.log(data);
    const formated = `${data.getFullYear()}-${data.getMonth()}-${
      data.getDate().toString().length < 2
        ? "0" + data.getDate()
        : data.getDate()
    }`;
    setDate(formated);
  };
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
      <DatePicker onChange={(data) => onSetDate(data)} minDate={new Date()} />

      <Link to="/">
        <button onClick={() => createTodo()}>Create Todo</button>
      </Link>
    </div>
  );
}

export default CreateTodo;
