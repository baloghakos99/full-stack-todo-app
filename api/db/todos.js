const knex = require("./knex");

function createTodo(todo) {
  return knex("todos").insert(todo);
}

function getAllTodo() {
  return knex("todos").select("*");
}
function getDone() {
  return knex("todos").where("status", "done");
}

function getActive() {
  return knex("todos").where("status", "active");
}

function deleteTodo(id) {
  return knex("todos").where("id", id).del();
}

function updateTodo(id, todo) {
  return knex("todos").where("id", id).update(todo);
}

module.exports = {
  createTodo,
  getAllTodo,
  deleteTodo,
  updateTodo,
  getDone,
  getActive,
};
