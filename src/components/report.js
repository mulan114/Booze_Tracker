import React from 'react';

import './report.css';

export default class Report extends React.Component {
	constructor(props) {
		super(props);

		console.log(props);
	}

	render() {
		return (
			<body>
				<heading>
					<h2>{this.props.data[0].type}</h2>
				</heading>
				<section>
					<ul>{
						this.props.data.map(element => {
							console.log(element.inv_amts.length);
							console.log(element.inv_amts[element.inv_amts.length-1]);  
							return (
								<div className="boozeEach">
									<div class="brandBlock">{element.brand}</div>
									<div class="nameBlock">{element.name}</div>
									<div class="lastUsageBlock">Last Usage: {element.prevUsage}</div>
									<div class="currentUsageBlock">Current Usage: {element.currentUsage}</div>
									<div class="onHandBlock">On Hand: {element.lastAmt}</div>
								</div>
							)
						})
					}
					</ul>
				</section>
			</body>
		);
	}
}

