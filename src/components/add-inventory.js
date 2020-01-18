import React from 'react';

import './add-inventory.css';

export default class AddInventory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			groups: [],
			brands: [],
			names: []
		}

		fetch('https://booze-tracking-api.herokuapp.com/booze/booze-pull/'+localStorage.getItem('token'), {
        	headers: { 
        		'Content-Type': 'application/json',
        		'Authorization': localStorage.getItem('token') 
        	}
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
			this.setState({groups: responseJson});
		});
	}

	onChange(evt) {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value
		})
	}

	onChange1(evt) {
		let boozeType = evt.currentTarget.value;
		this.setState({updateType: boozeType});

		let filteredGroups = this.state.groups.filter(item => (item.type === boozeType));

		let getBrands = [];
		filteredGroups.map(item => getBrands.push(item.brand));

		this.setState({brands: getBrands});
	}

	onChange2(evt) {
		let boozeBrand = evt.currentTarget.value;
		this.setState({updateBrand: boozeBrand});

		let filteredGroups = this.state.groups.filter(item => (item.brand === boozeBrand));

		let getNames = [];
		filteredGroups.map(item => getNames.push(item.name));

		this.setState({names: getNames});
	}

	onChange3(evt) {
		this.setState({updateName: evt.currentTarget.value});
	}

	onSubmit(evt) {
		evt.preventDefault()
		// console.log('submit at add-inventory');

		let purInfo = {
			date: this.state.purDate,
			amount: evt.currentTarget.getElementsByClassName('purAmt')[0].value			
		};

		let updateObj = {
			type: this.state.updateType,
			brand: this.state.updateBrand,
			name: this.state.updateName,
			pur_amts: purInfo
		}

		console.log(updateObj);


		fetch('https://booze-tracking-api.herokuapp.com/'+localStorage.getItem('token'), {
        	headers: { 
        		'Content-Type': 'application/json',
        		'Authorization': localStorage.getItem('token') 
        	},
        	method: 'POST',
        	body: JSON.stringify(updateObj)
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
		})
		.then(responseJson => {
			this.setState({
				groups: [],
				brands: [],
				names: [],
			})
		})
	}

	render() {
		console.log('in add-inventory');

		let subForDisplay = this.state.groups;
		console.log('this is the pull data');
		console.log(subForDisplay);
		

		let liquorTypes = [];
		subForDisplay.map((item, i) => {
			if (!liquorTypes.includes(item.type)) {
				liquorTypes.push(item.type);
			}
		});
		console.log('these are the liquor Types');
		console.log(liquorTypes);
		
		let liquorBrands = this.state.brands;
		let liquorNames = this.state.names;

		return (
			<div>			
				<h2>How much liquor you are adding to inventory: </h2>
				<br />
				<form className="add-booze" onSubmit={(e) => {this.onSubmit(e)}}>
					<label>Date </label><input type="date" name="purDate" required onChange={this.onChange.bind(this)} />
					<br /><br />
					<label>Type </label>
					<select onChange={(e) => {this.onChange1(e)}}>
						<option value="" selected disabled hidden>Liquor Type</option>
						{liquorTypes.map((lType) => <option key={lType}>{lType}</option>)}
					</select>
					<br /><br />
					<label>Brand </label> 
					<select onChange={(e) => {this.onChange2(e)}}>
						<option value="" selected disabled hidden>Brand</option>
						{liquorBrands.map((lBrand) => <option key={lBrand}>{lBrand}</option>)}
					</select>
					<br /><br />
					<label>Name </label>
					<select onChange={(e) => {this.onChange3(e)}}>
						<option value="" selected disabled hidden>Name</option>
						{liquorNames.map((lName) => <option key={lName}>{lName}</option>)}
					</select>
					<br /><br />
					<label>Amount </label><input type="number" className="purAmt" required onChange={this.onChange.bind(this)} />
					<br /><br />
					<button>Add</button>
				</form>
			</div>
		)
	}
}