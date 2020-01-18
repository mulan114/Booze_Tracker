import React from 'react';

import './new-booze.css';

export default class NewBooze extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			type: "",
			brand: "",
			name: "",
			amount: "",
		}
	}
	onChange(evt) {
		console.log(this.state);
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,

		})
	}
	onSubmit(evt) {
		evt.preventDefault();
		console.log('on submit in new booze');
		console.log(this.state);
        fetch('https://booze-tracking.herokuapp.com/booze/new-booze/'+localStorage.getItem('token'), {
        	headers: {
        		'Content-Type': 'application/json',
        		'Authorization': localStorage.getItem('token')
        	},
            method: 'POST',
            body: JSON.stringify(this.state),
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
				type: "",
				brand: "",
				name: "",
				invDate: "",
				invAmt: "",
			});
		});

		console.log('new booze submit works');
	}

	render() {
		

		console.log('submitting new booze');

		return (
			<div>			
				<h2>Please enter the new liquor you want to add: </h2>
				<br />
				<form className="new-booze" onSubmit={this.onSubmit.bind(this)}>
					<label>Date </label>
					<input type="date" name="invDate" value = {this.state.invDate} onChange={this.onChange.bind(this)} />
					<br /><br />
					<label>Type </label>
					<input type="text" name="type" value = {this.state.type} onChange={this.onChange.bind(this) } />
					<br /><br />
					<label>Brand </label>
					<input type="text" name="brand" value = {this.state.brand} onChange={this.onChange.bind(this)} />
					<br /><br />
					<label>Name </label>
					<input type="text" name="name" value = {this.state.name} onChange={this.onChange.bind(this)} />
					<br /><br />
					<label>Amount </label>
					<input type="number" name="invAmt" value = {this.state.invAmt} onChange={this.onChange.bind(this)} />
					<br /><br />
					<button>Add</button>
				</form>
			</div>
		)
	}
}