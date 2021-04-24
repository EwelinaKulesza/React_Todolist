import React, { useState, useEffect } from 'react';
//Importowanie komponentow
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';

function App() {

  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //USE EFFECT
  /*useEffect(() => {
    // console.log('hey')
    filterHandler();
  }, [todos, status])*/

  const statusHandler = (status) => {
    setStatus(status)
    filterHandler(status) 
  }

  const addTotodsHandler = (todos) => {
    setTodos(todos);
    filterHandler(status);
  }

  //Functions
  const filterHandler = (status) => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;  
      default: 
        setFilteredTodos(todos);
        break;
    }

  }
  return (
    <div className="App">
      <header>
        <h1>Ewelina's ToDo List </h1>
      </header>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={addTotodsHandler} 
        setInputText={setInputText}
        setStatus={statusHandler}
      />
      <TodoList 
        filteredTodos={filteredTodos} 
        setTodos={addTotodsHandler} 
        todos={todos} 
      />
    </div>
  );
}

export default App;
