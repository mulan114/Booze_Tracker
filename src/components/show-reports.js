import React from 'react';
import Report from './report.js';

import './show-reports.css';

export default class ShowReports extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inventory:[{
				type: "placeholder",
				brand: "placeholder",
				name: "placeholder",
				inv_amts: [{
					date: "2019-10-01 00:00:00.000Z",
					amount: 8.8
				}],
				pur_amts: [{
					date: "2019-10-01 00:00:00.000Z",
					amount: 0
				}]
			}]
		}
		fetch('https://git.heroku.com/booze-tracking-api.git:8080/reports/show-reports/'+localStorage.getItem('token'), {
        	headers: { 
        		'Content-Type': 'application/json',
        		'Authorization': localStorage.getItem('token') 
        	},
        })
		.then(res => {
			if (res.status === 401) {
				alert('user not authorized: no token provided');
				this.props.history.replace('/');
				return (res.status)
			}			
			else if (res.status === 500) {
				alert('user not authorized: token not valid');
				this.props.history.replace('/');
				return (res.status)
			}
			return res.json();
		})
		.then(responseJson => {
			this.setState({
				inventory: this.state.inventory.concat(responseJson),
			});
		});
	}

	render() {
		console.log('showing reports');

		let subForDisplay;
		if (this.state.inventory.length > 1) {
			subForDisplay = this.state.inventory.slice(1);
		}
		else subForDisplay = this.state.inventory;

		let result = {};
		subForDisplay.map((item, index) => {
			let key = item.type.toLowerCase().replace(/\s/g,'');
			if (!(key in result)) {
				result[key] = [];
			}
			result[key].push(item);
		});


// need to make "My Restaurant" a variable in the future
		return (
			<body>
				<heading>
					<h2>My Liquor Tracker</h2>
				</heading>
				<section>
					<h3>Here are the current status and last 2 usage reports:</h3>
					<div className="boozeTypes">{
						Object.keys(result).map(key => <Report data = {result[key]} />)
					}
					</div>
				</section>
			</body>
		);
	}
}

