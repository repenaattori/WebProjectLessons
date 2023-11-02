import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./components/Contexts";
import { Login } from "./components/Auth";
import axios from "axios";

const persons = [
  { fname: 'Reima', lname: 'Riihimäki' },
  { fname: 'John', lname: 'Doe' },
  { fname: 'Lisa', lname: 'Simpson' }
];


function App() {

  const [login, setLogin] = useState(false);

  return (
    <DataExample/>
    // <LoginContext.Provider value={{login, setLogin}}>
    //   <h4>Arvo on {login.toString()}</h4>
    //   <Login/>
    //   <PersonList/>
    // </LoginContext.Provider>
  );
}


function PersonList() {

  const items = persons.map((p, i) => <li key={i}>{p.fname}</li>);

  return (
    <ul>
      {items}
    </ul>
  )
}


function PostExample() {

  useEffect(() => {

    const user = {
      username: 'repe',
      pw: 'asdfafs'
    }

    axios.postForm('http://localhost:3001/user', user )
      .then(resp => console.log('onnistui'))
      .catch(error => console.log(error.message))

  }, []);


  return (
    <div>

    </div>
  );
}


function GetExample() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://random-data-api.com/api/v2/users?size=10')
      .then(resp => {
        const uusi = resp.data.map(u => ({ email: u.email, avatar: u.avatar }));
        setUsers(uusi);
      })
      .catch(error => console.log(error.message))
  }, []);


  return (
    <div>
      {
        users.map(u => <UserInfo email={u.email} avatar={u.avatar} />)
      }
    </div>
  );
}

function UserInfo({ email, avatar }) {
  return (
    <div>
      <h4>{email}</h4>
      <img src={avatar} height={80} />
    </div>
  );
}


function DataExample(){

  const [text, setText] = useState('');
  const [texts, setTexts] = useState([]);

  return(
    <div>
      <input value={text} onChange={e => setText(e.target.value)}/>
      <button onClick={()=> setTexts( [...texts, text] )} >Add text</button>
      <ul>
        {texts.map(t => <li>{t}</li>)}
      </ul>
    </div>
  )

}

export default App;
