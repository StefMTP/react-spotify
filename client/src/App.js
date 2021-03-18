import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
  return ( 
    <div className="text-light" style={{background: '#333'}}>
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
    );
}

export default App;
