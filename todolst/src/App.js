import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
//Importowanie komponentow
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';
import { LoginContext } from "./contexts/LoginContext";



// Custom hook do fetchowania danych z serwera /Grzesiek
function useFetch(path) {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(path);
      const formattedData = await data.json();
      setFetchedData(formattedData);
    };
    fetchData();
  }, [path])

  return fetchedData;
}



function App() {

  const { logged, signOut, todos, setTodos } = useContext(LoginContext);
  //State stuff
  const [inputText, setInputText] = useState("");
  // Stan dodosów i funkcję useLocalStorage musiałem przenieść do kontekstu...
  // ...aby komponent ClickedToDo również miał dostęp, nie powinno się tak robić ogólnie...
  // ...ale alternatywa to oddzielny kontekst ze stanem i wypadałoby tam zrobić reducera a w to się nie bawimy póki co

  // Status i tak jest przekazywany jako target więc nie ma sensu trzymać go w stanie//   Grzesiek
  // const [status, setStatus] = useState('all');

  // Nie ma potrzeby trzymać tego w storage skoro zawsze bazuje na todos//    Grzesiek
  const [filteredTodos, setFilteredTodos] = useState(todos);


  const statusHandler = (status) => {
    filterHandler(status)
  }

  const addTotodsHandler = (newTodos) => {
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  }

  // Poniższe poza useEffectem bo nie można łączyć hooków w taki sposób ale pewnie można lepiej //Grzesiek
  const URL = 'https://jsonplaceholder.typicode.com/users/1/todos';
  const fetchedData = useFetch(URL);

  // Ta funkcja przekształca obiekt otrzymany fetchem na taki o tym samym formacie którego używamy /Grzesiek
  const dataParser = (data) => (
    data.map((entry) => {
      return {
        text: entry.title,
        completed: entry.completed,
        id: Math.floor(Math.random() * 100000)
      }
    }
    )
  )


  useEffect(() => {
    if (todos.length === 0) {
      if (fetchedData.length !== 0) {
        const parsedData = dataParser(fetchedData);
        setTodos(parsedData);
        setFilteredTodos(parsedData);
      }
    }
  }, [setFilteredTodos, setTodos, fetchedData, todos])


  //Functions
  const filterHandler = (status) => {
    switch (status) {
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

  if (!logged) {
    return (<Redirect to={{ pathname: "/login" }} />)
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

      {/* // Styl można usunąć, dałem żebyście nie przeoczyli przycisku /Grzesiek */}
      <button style={{ fontSize: "60px" }} onClick={() => { signOut() }}>Log out</button>
    </div>
  );
}

export default App;
