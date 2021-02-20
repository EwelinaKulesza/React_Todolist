import React from 'react';

const Form = ({ setInputText, todos, setTodos, inputText }) => {
    //Tu mogę wpisać kod java script i wrzucać funkcje
    const setInputTextHandler = (e) => {
        console.log(e.target.value);  //loguje tu event
        setInputText(e.target.value);
    }
    const submitTodoHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos, {text: inputText, completed: false,id: Math.floor(Math.random()*100000)}
        ]);
    }
    return(
 <form>   
      <input onChange={setInputTextHandler} type="text"  className="todo-input"/>   {/**to miejsce gdzie wpisuję zadania */}
     <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
     </button>
     <div className="select">
         <select name="todos" className="filter-todo">
             <option value="all">All</option>
             <option valie="completed">Completed</option>
             <option value="uncompleted">Uncompleted</option>
         </select>
     </div>
 </form>

    );
    
}

export default Form;