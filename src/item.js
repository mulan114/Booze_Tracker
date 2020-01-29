import React from 'react';

import './item.css';

class Item extends React.Component {
	constructor(props) {
        super(props);
        this.text = props.text;
	}

	render() {
		let link;
		switch(this.text) {
			case "  Home  ":
				link = "/";
				break;
			case "  Inventory  ":
				link = "/inventory";
				break;
			case "  Report  ":
				link = "/show-reports";
				break;
			case "  Add to Inventory  ":
				link = "/add-inventory";
				break;
			case "  Add New Liquor  ":
				link = "/new-booze";
				break;
			default:
				link = "/logout";

		}
		return (
			<div className='top-menu-item'>
				<a href={link}>{this.text}</a>
			</div>
		)
	}
}

export default Item;