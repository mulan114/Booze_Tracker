import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './main';

function App() {
  return (
    <div className="App">
		<header>
			<a href="/">  Home  -</a>
			<a href="/inventory">  Inventory  -</a>
			<a href="/show-reports">  Report  -</a>
			<a href="/add-inventory">  Add to Inventory  -</a>
			<a href="/new-booze">  Add New Liquor  -</a>
			<a href="/logout">  LOGOUT  </a>
		</header>
		<br />
      	<Main />
    </div>
  );
}

export default App;
