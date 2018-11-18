import React from 'react';
import ListItem from "./ListItem";

//Holds ListItems, inside SideBar
const VenueList = ({venues, handleListItemClick}) => {
	
	return (
		<ul className="venueList"
		aria-label="List of Venues"
		>
			{venues && 
			venues.map((venue, index) => (
				<ListItem 
				key={index} 
				{...venue} 
				handleListItemClick=
				{handleListItemClick} 
				/>
				))
			}
		</ul>
	);
}

export default VenueList;