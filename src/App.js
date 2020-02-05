import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

import './App.css';

import Item from './item';
import Main from './main';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menu_class: 'untoggled',
		}
	}

  	setToggleTopMenuClass(evt) {
  		evt.preventDefault();
    	if (this.state.menu_class === 'untoggled') {
      		this.setState({
        		menu_class: 'toggled',
      		})
    	} else {
      		this.setState({
        		menu_class: 'untoggled',
      		})
    	}
  	}

	render() {	
		let top_menu_class = `top-menu ${this.state.menu_class}`;
		console.log(top_menu_class);

		if (localStorage.getItem('token')) {
			return (
			    <div className="App">
					<header className = {top_menu_class}>
						<Item text="  Inventory  " />
						<Item text="  Report  " />
						<Item text="  Add to Inventory  " />
						<Item text="  Add New Liquor  " />
						<Item text="  Logout" />
					</header>
					<FontAwesomeIcon icon={faBars} className='menu-icon' onClick={(e) => {this.setToggleTopMenuClass(e)}}/>
					<div className='clear-fix' />
					<br />
			      	<Main />
			    </div>
			);
		}
		else { 
			return (
			    <div className="App">
					<header className = {top_menu_class}>
						<Item text="  Home  "/>
					</header>
			      	<FontAwesomeIcon icon={faBars} className='menu-icon' onClick={(e) => {this.setToggleTopMenuClass(e)}}/>
			      	<div className='clear-fix' />
			      	<Main />
			    </div>
			);
		}
	}
}

