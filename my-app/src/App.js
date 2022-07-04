import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
/* uuid is the library to create random unique ids to avoid error of same id */
import uuidv4 from "../node_modules/uuid/dist/v4";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  /* This useEffect is used to set the values , remember to change the string of getItem into array by JSON.parse , also dont forget to pass
  storedTodos inside setTodos . Well did these mistakes */
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  /* Here second parameter todos is the dependency , that if it changes only then run the first function. */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    /* So this todos are all the values which we added */
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodos() {
    /* This will only display which are not complete */
    const newTodos = todos.filter((todo) => !todo.complete);
    /* Setting is very important if we made changes */
    setTodos(newTodos);
  }

  // Click eventListener for Add Todos
  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      /* Spread operator to display all the previous added notes */
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  return (
    <>
      {/* jsx is the react version of html , TodoList tag down is the example of jsx where html has no close tag but it closed in the same tag.*/}
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text"></input>
      <button onClick={handleAddTodo}>Add Todos </button>
      <button onClick={handleClearTodos}> Clear Complete </button>
      {/* These curly braces are for javascript , we write the js lines in it. */}
      <div> {todos.filter((todo) => !todo.complete).length} left to do </div>
    </>
  );
}
export default App;
