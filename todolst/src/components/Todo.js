import React from 'react';

const Todo = ({text}) => {
    return(
        <div className="todo">
            <li className = 'todo-item'>{text}</li>
            <i className="fas fa-check"></i>
            <button className="complete-btn"></button>
            <i className="fas fa-trash"></i>
            <button className="trash-btn"></button>
        </div>
    );
}

export default Todo; 