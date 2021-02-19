import React from "react";
import './App.css';
//Importowanie komponentow
import Form from './components/Form';
function App() {
  return (
    <div className="App">
      <header>
        <h1>Ewelina's ToDo List</h1>
      </header>
      <Form />
    </div>
  );
}

export default App;