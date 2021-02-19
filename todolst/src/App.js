import React, { Component } from "react";
import './App.css';
//Importowanie komponentow
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Ewelina's ToDo List</h1>
      </header>
      <Form />
      <TodoList />
    </div>
  );
}

export default App;
