import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginPage from "./components/LoginPage"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginProvider } from "./contexts/LoginContext"
import ClickedToDo from "./components/ClickedToDo";

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <Switch>
          <Route path="/ToDoList">
            <App />
          </Route>
          <Route path="/ToDo/:id">
            <ClickedToDo />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
