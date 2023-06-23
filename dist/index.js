"use strict";
const button = document.getElementById("button");
// Returns an HTMLElement or null (if it doesn't find thst element)
// ! (Non-Null Assertion Operator) - Guarentees to TS that this won't be null, can remove the ? on the eventListener but only use this if you're 100% sure it's not null
const input = document.getElementById("todo-input");
// Using a TYPE ASSERTION to make sure TS knows what specific type it is rather then a generic HTMLElement (for access to more methods etc). Alternative = <HTMLInputElement(input)>.value but not with React/JSX
const form = document.querySelector("form");
const list = document.getElementById("todo-list");
// Creating the new todo element (with checkbox) on the DOM
const createTodo = (todo) => {
    const newLI = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked; // To do completed = checked attribute of checkbox (true or false)
        saveTodos();
    });
    newLI.append(todo.text);
    newLI.append(checkbox);
    list === null || list === void 0 ? void 0 : list.append(newLI);
};
const todoList = readTodos();
todoList.forEach(createTodo);
// element? - if button exists do this, if not and it's null  don't
function readTodos() {
    const todoListJSON = localStorage.getItem("todoList");
    if (todoListJSON === null)
        return [];
    return JSON.parse(todoListJSON);
}
function saveTodos() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
const handleSubmit = (evt) => {
    evt.preventDefault();
    // Adding the new todo to the todoList - for Local Storage
    const newTodo = {
        text: input.value,
        completed: false
    };
    todoList.push(newTodo);
    createTodo(newTodo);
    saveTodos();
    input.value = "";
};
form.addEventListener("submit", handleSubmit);
