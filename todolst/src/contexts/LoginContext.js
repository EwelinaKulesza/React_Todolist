import * as React from "react";
import { useHistory } from "react-router-dom";

const LoginContext = React.createContext();


function useLocalStorageState(key, defaultValue) {
    const [value, setValue] = React.useState(() => {
        const valueFromLocalStorage = window.localStorage.getItem(key);
        if (valueFromLocalStorage) {
            return JSON.parse(valueFromLocalStorage);
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return [value, setValue];
}








function LoginProvider(props) {
    const [logged, setLogged] = React.useState(false);
    const [todos, setTodos] = useLocalStorageState("mykey", []);
    let history = useHistory();

    const signIn = (username, password) => {
        setLogged(true);
        history.push("/ToDoList");
    }

    const signOut = () => {
        setLogged(false)
    }

    const value = { logged, signIn, signOut, todos, setTodos };
    return <LoginContext.Provider value={value}>{props.children}</LoginContext.Provider>
}

export { LoginContext, LoginProvider };