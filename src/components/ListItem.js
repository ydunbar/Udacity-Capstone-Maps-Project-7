import React, { Component } from 'react';

//Each venue's icon and name, makes up VenueList inside SideBar. onClick opens marker. image alt tag for a11y.
export default class ListItem extends Component {

	render() {
		return (
			<li 
			className="listItem" 
			tabIndex ="0"
			role="menuitem"
			aria-label = {this.props.name}
			onClick={() => this.props.handleListItemClick(this.props)}
			>
				<img 
				src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix} 
				alt={this.props.categories[0].name} 
				/>
				{this.props.name}
			</li>
		);
	}
}