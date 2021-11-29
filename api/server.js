import express from "express";
const app = express();

import bodyParser from "body-parser";

import sqlite3 from "sqlite3";

import { open } from "sqlite";

import cors from "cors";

const dbPromise = open({
  filename: "db.sqlite3",
  driver: sqlite3.Database,
});

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/todos", async (req, res) => {
  const db = await dbPromise;
  const todo = await db.run(
    "INSERT INTO todos (title, description, status, timestamp) VALUES (?,?,?,?);",
    req.body.title,
    req.body.description,
    req.body.status,
    req.body.timestamp
  );
  res.json({ todo });
});

app.get("/todos", async (req, res) => {
  const db = await dbPromise;
  const todos = await db.all("SELECT * FROM todos");
  res.json({ todos });
});

app.get("/todos/done", async (req, res) => {
  const db = await dbPromise;
  const todos = await db.all("SELECT * FROM todos WHERE status='done'");
  res.json({ todos });
});

app.get("/todos/active", async (req, res) => {
  const db = await dbPromise;
  const todos = await db.all("SELECT * FROM todos WHERE status='active'");
  res.json({ todos });
});

app.delete("/todos/delete/:id", async (req, res) => {
  const db = await dbPromise;
  await db.run(`DELETE FROM todos WHERE id=${req.params.id};`);
  const todos = await db.all("SELECT * FROM todos");

  res.json({ todos });
});

app.patch("/todos/update/:id", async (req, res) => {
  const db = await dbPromise;
  await db.run(
    `UPDATE todos SET title=?, description=?, status=?, timestamp=? WHERE id=?; `,
    req.body.title,
    req.body.description,
    req.body.status,
    req.body.timestamp,
    req.params.id
  );
  const todos = await db.all("SELECT * FROM todos");

  res.json({ todos });
});

app.get("/todo/:id", async (req, res) => {
  const db = await dbPromise;
  const todo = await db.all(`SELECT * FROM todos WHERE id=?;`, req.params.id);
  res.status(200).json({ todo });
});

const setup = async () => {
  const db = await dbPromise;
  await db.migrate();
  app.listen("1999", () => {
    console.log("Server started on port: 1999");
  });
};

setup();
