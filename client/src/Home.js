import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const URL_BASE = "http://localhost:1999";

function Home() {
  const [todos, setTodos] = useState([]);
  const [radio, setRadio] = useState("All");

  useEffect(() => {
    if (radio === "All") {
      getTodos();
    }
    if (radio === "Done") {
      getDone();
    }
    if (radio === "Active") {
      getActive();
    }
  }, [radio]);

  useEffect(() => {
    if (radio === "All") {
      getTodos();
    }
    if (radio === "Done") {
      getDone();
    }
    if (radio === "Active") {
      getActive();
    }
  }, []);

  const getTodos = () => {
    fetch(URL_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));
  };

  const getDone = () => {
    fetch(URL_BASE + "/todos/done")
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));
  };

  const getActive = () => {
    fetch(URL_BASE + "/todos/active")
      .then((res) => res.json())
      .then((data) => setTodos(data.todos));
  };

  const deleteTodo = async (id) => {
    const data = fetch(URL_BASE + `/todos/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())

      .then((data) => setTodos(data.todos));
  };

  const changeStatus = async (todo) => {
    let allChecked = document.getElementById("All").checked;

    if (todo.status === "active") {
      const data = await fetch(URL_BASE + `/todos/update/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          status: "done",
          timestamp: todo.timestamp,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          setTodos(data.todos.filter((todo) => todo.status === "active"))
        );
    } else {
      const data = await fetch(URL_BASE + `/todos/update/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          status: "active",
          timestamp: todo.timestamp,
        }),
      }).then((res) => res.json());
      let arr = data.todos.filter((todo) => todo.status === "done");
      setTodos(arr);
    }
    if (allChecked) {
      getTodos();
    }
  };

  return (
    <div className="Home">
      <h1>Hello there!</h1>

      <h4>
        {todos.length === 0
          ? "You dont have any todos"
          : `Here are your tasks (${todos.length}):`}
      </h4>

      <form id="form">
        <label>All</label>
        <input
          className="radio"
          type="radio"
          checked={radio === "All"}
          name="status"
          id="All"
          value="All"
          onChange={(e) => setRadio(e.target.value)}
        ></input>
        <label>Active</label>

        <input
          type="radio"
          className="radio"
          name="status"
          id="Active"
          value="Active"
          onChange={(e) => setRadio(e.target.value)}
        ></input>
        <label>Done</label>

        <input
          type="radio"
          className="radio"
          name="status"
          id="Done"
          value="Done"
          onChange={(e) => setRadio(e.target.value)}
        ></input>
      </form>

      {todos.map((todo) => (
        <div className={todo.status === "active" ? "todos" : "todos done"}>
          <div onClick={() => changeStatus(todo)} className="title">
            {todo.title}
          </div>
          <div className="description">{todo.description}</div>
          <div className="bottom-line">
            <Link to={`/update-todo/${todo.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <div className="date"> Deadline: {todo.timestamp}</div>
          </div>
        </div>
      ))}

      <Link to="/create-todo">
        <button className="central-button">Add new todo</button>
      </Link>
    </div>
  );
}

export default Home;
