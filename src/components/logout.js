import React from 'react';

// add css import

export default class Logout extends React.Component {
	render() {
		console.log('i am in logout');
		localStorage.removeItem('token');
		window.location.href='/';
		return('')
	}
}