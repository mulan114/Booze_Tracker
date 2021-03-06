import React from 'react';

// add css import

export default class LandingPage extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			userName: '',
			password: ''
		}
	}

	onChange(evt) {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
		})
	}

	onSubmit(evt) {
		evt.preventDefault();

		let userInfo = {
			uName: this.state.userName,
			pWord: this.state.password			
		};

		console.log(JSON.stringify(userInfo));

		fetch('https://booze-tracking-api.herokuapp.com/users/login', {
        // fetch('http://localhost:8080/users/login', {
        	headers: 
        		{ 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(userInfo)
        })
        .then(res => {
            console.log('i am in res');
            console.log(res.status);
            if (res.status === 404) {
                console.log('i am in res status');
                alert('User not found');
                this.setState({
                	userName: '',
                	password: ''
                });
                window.location.href='/';
            }
            else if (res.status === 401) {
                console.log('i am in res status');
                alert('User or password do not match');
                this.setState({
                	userName: '',
                	password: ''
                });
                window.location.href='/';
            }
            else {
            	return res.json();
            }
        })
        .then(responseJson => {
            if (responseJson) {
	            alert('You are logged in.');
	            localStorage.setItem('token', responseJson.data.token);
	            window.location.href='/inventory';
	        }
        })
	}

	render() {
		console.log('i am in landing page');

		if (localStorage.getItem('token')) {
			return window.location.href='/inventory';
		}

		else {
			return (
				<div>
					<h1>Welcome to Booze Tracker!</h1>
					<h3>This simple tool helps restaurants conduct inventory and track liquor usage</h3>
					<p>Once logged in, Booze Tracker will automatically take you to the inventory page where you can update your current on hand stock. At any time, feel free to click on the REPORT link above to see your last and current usages.  To add new liquor or add to your existing inventory, click on "Add New Liquor" or "Add to Inventory" respectively!</p>
					<br /><br />
					<form className="regnauth" onSubmit={this.onSubmit.bind(this)}>
						<h2>Please login or create an account</h2>
						<p>If would like to test this product, please enter username: demo@thinkful.com and password: thinkful</p>
						Username  <input type="email" name="userName" value = {this.state.userName} placeholder="email address" required onChange={this.onChange.bind(this)} />
						<br />
						Password  <input type="password" name="password" value = {this.state.password} required onChange={this.onChange.bind(this)} />
						<br />
						<button name="login"> Login </button>
						<button name="create" onClick={()=> {this.props.history.replace('/create-user')}}> Create </button>
					</form>
				</div>
			);
		}
	}
}