import { useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

function LoginPage() {
    const [inputValue, setInputValue] = useState({ username: "", password: "" });
    const { signIn } = useContext(LoginContext);

    const buttonFunction = () => {
        if (inputValue.username.length > 2 && inputValue.password.length > 2) {
            signIn();
        }
    }
    return (
        <div>
            <h1>Please login</h1>
            <input value={inputValue.username} onChange={(e) => { setInputValue({ ...inputValue, username: e.target.value }) }} />
            <br></br>
            <input value={inputValue.password} onChange={(e) => { setInputValue({ ...inputValue, password: e.target.value }) }} />
            <br></br>
            <button onClick={() => { buttonFunction() }}>Login</button>
            <p>Any username and password with at least 3 characters is good enough.</p>
        </div>
    )
}

export default LoginPage;