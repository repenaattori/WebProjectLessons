import { useContext, useState } from "react";
import { LoginContext } from "./Contexts";
import { jwtToken } from "./Signals";

function Login() {
  
    const buttonLabel = login ? 'Logout' : 'Login';
  
    return (
      <div>
        {jwtToken.value.length > 0 ? <h2>Welcome!</h2> : <h4>Unauthorized</h4>}
        <button onClick={() => setLogin(!login)}>
          {buttonLabel}
        </button>
      </div>
    );
  }

  function LoginForm(){

    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');

    return(
      <div>
        <input value={username} onChange={e => setUsername(e.target.value)}/>
        <input value={pw} onChange={e => setPw(e.target.value)}/>
      </div>
    );
  }

export {Login};