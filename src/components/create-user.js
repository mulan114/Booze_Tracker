import React from 'react';

// add css import

export default class CreateUser extends React.Component {
	constructor(props) {
		super(props);
	}

	onChange(evt) {
		console.log(this.state);
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
		})
	}

	onSubmit(evt) {
		evt.preventDefault();

		let userInfo = {
			organization: this.state.org,
			uName: this.state.userName,
			fName: this.state.firstName,
			lName: this.state.lastName,
			pWord: this.state.password			
		};

		console.log(JSON.stringify(userInfo));

		fetch('https://booze-tracking-api.herokuapp.com/users/create-user', {
        	headers: 
        		{ 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(userInfo)
        })
        .then(responseJson => {
            if (responseJson.status === 404) {
                alert('This user already exists.');
            } 
            else {
                alert('Success! New user created.');
                this.props.history.replace('/inventory');
            }
        })
	}

	render() {
		console.log('i am in create user - front');
		return (
			<div>
				<form id="createuser" onSubmit={this.onSubmit.bind(this)}>
					<h3>Please complete the form to create a user.  Once complete, the app will log you in.</h3>
					<br /><br />
					Organization <input type="text" name="org" onChange={this.onChange.bind(this)} />
					<br /><br />
					Username  <input type="email" name="userName" placeholder="email address" required onChange={this.onChange.bind(this)} />
					<br /><br />
					First Name  <input type="text" name="firstName" onChange={this.onChange.bind(this)} />
					<br /><br />
					Last Name   <input type="text" name="lastName" onChange={this.onChange.bind(this)} />
					<br /><br />
					Password  <input type="password" name="password" onChange={this.onChange.bind(this)} />
					<br /><br />
					<button name="createnlogin"> Create & Login </button>
				</form>
			</div>
		);
	}
}

