import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/landing-page';
import CreateUser from './components/create-user';
import NewBooze from './components/new-booze';
import DoInventory from './components/do-inventory';
import AddInventory from './components/add-inventory';
import ShowReports from './components/show-reports';
import Logout from './components/logout';

// add css import

export default class Main extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		console.log('i am in main');
		// Foute set up
		// Landing page sets up user to their particular organization
		// New booze enables users to add a liquor that has not previously existed in the inventory
		// Inventory is the page that enables a user to enter current amounts for periodic inventory
		// Add inventory enables a user to add purchased amounts to existing inventory
		// Show reports provides users with current and previous usage amounts
		return (
			<Switch>
				<Route exact path ="/" component={LandingPage} />
				<Route path ="/create-user" component={CreateUser} />
				<Route path = "/new-booze" component={NewBooze} />
				<Route path = "/inventory" component={DoInventory} />
				<Route path = "/add-inventory" component={AddInventory} />
				<Route path = "/show-reports" component={ShowReports} />
				<Route path = "/logout" component={Logout} />
			</Switch>

		)
	}
}