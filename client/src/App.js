import { useContext, useState } from "react";
import { LoginContext } from "./components/Contexts";
import { Login } from "./components/Auth";

const persons = [
  {fname: 'Reima', lname: 'Riihimäki' },
  {fname: 'John', lname: 'Doe' },
  {fname: 'Lisa', lname: 'Simpson' }
];


function App() {

  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{login, setLogin}}>
      <h4>Arvo on {login.toString()}</h4>
      <Login/>
      <PersonList/>
    </LoginContext.Provider>
  );
}


function PersonList(){

  const items = persons.map( (p,i) => <li key={i}>{p.fname}</li> );

  return(
    <ul>
      { items }
    </ul>
  )
}

export default App;
