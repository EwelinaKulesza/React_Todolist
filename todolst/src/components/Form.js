import React from 'react';

const Form = ({ setInputText, todos, setTodos, inputText, setStatus }) => {
    //Tu mogę wpisać kod java script i wrzucać funkcje
    const setInputTextHandler = (e) => {
        // console.log(e.target.value);  //loguje tu event
        setInputText(e.target.value);
    }
    const submitTodoHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos, {text: inputText, completed: false,id: Math.floor(Math.random()*100000)}
        ]);
        setInputText("");
    };
    const statusHandler = (e) => {
        // console.log(e.target.value);
        setStatus(e.target.value);
    }
    return(
 <form>   
      <input 
      value={inputText} 
      onChange={setInputTextHandler} 
      type="text" 
      className="todo-input"
      />
     <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
     </button>
     <div className="select">
         <select onChange={statusHandler} name="todos" className="filter-todo">
             <option value="all">All</option>
             <option value="completed">Completed</option>
             <option value="uncompleted">Uncompleted</option>
         </select>
     </div>
 </form>

    );
    
}

export default Form;