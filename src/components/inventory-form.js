import React from 'react';
import tick from './tick.jpg';

import './inventory-form.css';

export default class InvForm extends React.Component {
	constructor(props) {
		super(props);
	}

	onChange(evt) {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
		})
	}

	onSubmit(evt, boozeId) {
		evt.preventDefault();
		console.log(boozeId);
		let updateInfo = {
    		id: boozeId,
			invDate: this.state.invDate,
			invAmt: evt.currentTarget.getElementsByClassName('invAmt')[0].value			
		};
		console.log(updateInfo);

		fetch('https://booze-tracking-api.herokuapp.com/booze/inventory/'+localStorage.getItem('token'), {
        	headers: { 
        		'Content-Type': 'application/json',
        		'Authorization': localStorage.getItem('token')
        	},
            method: 'POST',
            body: JSON.stringify(updateInfo)
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
			return ('')
		})
		.catch(err => {
			console.log('i erred and did not return empty string');
		});

		document.getElementById(boozeId).removeAttribute("hidden");

	}

	render() {
		console.log('in inventory form');

		return (
			<body>
				<heading>
					<h2>{this.props.data[0].type}</h2>
					<h3>Date:  <input name="invDate" type="date" required onChange={this.onChange.bind(this)} /> </h3>
				</heading>
				<section>

					<ul>{
						this.props.data.map(element => {
							return (
								<form className="boozeEachInv" onSubmit={(e) => {this.onSubmit(e, element._id)}}>
									<div clasName="brandBlockInv">{element.brand} </div>
									<div className="nameBlockInv">{element.name}</div>
						 			<div className="currentInvBlock"> Current Status: </div>
						 			<input className = "invAmt" type="number" step="0.1" size="4" required onChange={this.onChange.bind(this)} />
						 			<button value={element._id}>Submit</button>
						 			<img id={element._id} hidden src={tick} alt="ok" height="20" width="20" />
								</form>
							)
						})
					}
					</ul>
				</section>
			</body>
		);
	}
}