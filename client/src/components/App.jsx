import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Agents from './Agents.jsx'
import Login from './Login.jsx'


const App = () => {

  return (
    <div className="main">
      <h1 className="main-header">API </h1>
      <Login />
      <Agents />
    </div>
  )
}

export default App;
