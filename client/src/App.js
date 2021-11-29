import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import CreateTodo from "./CreateTodo";
import UpdateTodo from "./UpdateTodo";

const URL_BASE = "http://localhost:1999";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/create-todo">
          <CreateTodo />
        </Route>
        <Route
          path="/update-todo/:id"
          render={(props) => <UpdateTodo {...props} />}
        />

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
