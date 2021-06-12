import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
//Importowanie komponentow
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';
import { LoginContext } from "./contexts/LoginContext";



// Custom hook do fetchowania danych z serwera
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
  // Stan dodosów i funkcję useLocalStorage musiałam przenieść do kontekstu...
  // ...aby komponent ClickedToDo również miał dostęp, nie powinno się tak robić ogólnie...
  // ...ale alternatywa to oddzielny kontekst ze stanem i wypadałoby tam zrobić reducera jak będę miała czas

  // Status i tak jest przekazywany jako target więc niebędę trzymała go w stanie
  // const [status, setStatus] = useState('all');

  // Nie ma potrzeby trzymać tego w storage skoro zawsze bazuje na todos
  const [filteredTodos, setFilteredTodos] = useState(todos);


  const statusHandler = (status) => {
    filterHandler(status)
  }

  const addTotodsHandler = (newTodos) => {
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  }

  // Poniższe poza useEffectem bo nie można łączyć hooków w taki sposób zapewne można lepiej
  const URL = 'https://jsonplaceholder.typicode.com/users/1/todos';
  const fetchedData = useFetch(URL);

  // Ta funkcja przekształca obiekt otrzymany fetchem na taki o tym samym formacie którego używam
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

      {/* // Styl można usunąć, dałam żeby nie zapomnieć o przycisku */}
      <button style={{ fontSize: "60px" }} onClick={() => { signOut() }}>Log out</button>
    </div>
  );
}

export default App;
