import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useParams } from "react-router-dom"

function ClickedToDo() {
    const { id } = useParams();
    const { todos } = useContext(LoginContext);

    const todo = todos.find((todo) => todo.id.toString() === id);
    return (
        <div>
            <h2>{todo.text}</h2>
        </div>
    )
}

export default ClickedToDo;