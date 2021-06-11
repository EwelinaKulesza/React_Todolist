import React from "react";
//Import Components
import Todo from "./Todo";

// function useLocalStorageState(key, defaultValue) {
//   const [value, setValue] = React.useState(() => {
//     const valueInLocalStorge = window.localStorage.getItem(key);
//     if (valueInLocalStorge) {
//       return JSON.parse(valueInLocalStorge);
//     }
//     return typeof defaultValue == `function` ? defaultValue() : defaultValue;
//   });

//   React.useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// }










function TodoList({filteredTodos, setTodos, todos}) {
//const TodoList = ({ todos, setTodos, filteredTodos }) => {
// const [todos, setTodos, filteredTodos] = useLocalStorageState('todos', []);
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            setTodos={setTodos}
            todos={todos}
            key={todo.id}
            todo={todo}
            text={todo.text}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
