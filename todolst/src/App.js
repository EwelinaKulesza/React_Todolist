import React, { useState, useEffect } from 'react';
//Importowanie komponentow
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';


function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = React.useState(() => {
    const valueFromLocalStorage = window.localStorage.getItem(key);
    if (valueFromLocalStorage) {
      return JSON.parse(valueFromLocalStorage);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
}

function App() {

  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useLocalStorageState("mykey", []);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useLocalStorageState("secondkey", []);

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

  React.useEffect(
    () => {
      const URL = 'https://jsonplaceholder.typicode.com/users/1/todos';
      useFetch(URL).then(response => response.json()).then(items => console.log(items))
    },
    []
  );

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
