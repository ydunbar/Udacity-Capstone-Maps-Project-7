import React, { Component } from 'react';
import VenueList from "./VenueList";

export default class SideBar extends Component {

	constructor() {
		super();
		this.state = {
			query: "",
			venues: []
		};
	}

	//Search input, including lowercase
	handleFilterVenues = () => {
		if (this.state.query.trim() !== "") {
			const venues = this.props.venues.filter(venue => 
				venue.name
				.toLowerCase()
				.includes(this.state.query.toLowerCase())
				);
			return venues;
		}
		return this.props.venues;
	};

	handleChange = e => {
		this.setState({ query: e.target.value });
		//Hide markers with search input, include lowercase
		const markers = this.props.venues.map(venue => {
			const marker = this.props.markers
			.find(marker => marker.id === venue.id);
			if (venue.name
			.toLowerCase()
			.includes(e.target.value.toLowerCase()) === true){
				marker.isVisible = true;
			} else {
				marker.isVisible = false;
			}
			return marker;
		});
		this.props.updateSuperState({ markers });
	};

	render() {
		return (
			<div className="sideBar"
			role="contentInfo"
			aria-label="Pizza places in Chicago"
			>
				<div id={"searchDiv"}>
				<input type={"search"} 
				id={"search"} 
				aria-label="Search"
				placeholder={"Search"} 
				autoFocus
				onChange={this.handleChange} 
				/>
				</div>
				<VenueList 
				{...this.props} 
				venues={this.handleFilterVenues()}
				handleListItemClick={this.props.handleListItemClick} 
				/>
			</div>
		);
	}
}