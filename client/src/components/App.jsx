import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Agents from './Agents.jsx'
import Login from './Login.jsx'


const App = () => {
  const [login, setLogin] = useState(true)

  return (
    <div className="main">
      <h1 className="main-header">Valorant API</h1>
      {login ? <Login /> : null}
      <Agents />
    </div>
  )
}

export default App;
