import { useContext } from "react";
import { LoginContext } from "./Contexts";

function Login() {

    const {login, setLogin} = useContext(LoginContext);
  
    const buttonLabel = login ? 'Logout' : 'Login';
  
    return (
      <div>
        {login ? <h2>Welcome!</h2> : <h4>Unauthorized</h4>}
        <button onClick={() => setLogin(!login)}>
          {buttonLabel}
        </button>
      </div>
    );
  }


export {Login};