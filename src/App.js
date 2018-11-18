//Followed tutorial by Forrest Walker: https://www.youtube.com/watch?v=Q0vzqlnWWZw&index=2&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP
import React, { Component } from 'react';
import "./App.css";
import MapContainer from "./components/Map";
import SideBar from "./components/SideBar";
import FourSquareAPI from "./API/Index";
//Using this for error handling: https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
import ErrorBoundary from './ErrorBoundary';

//Main component at the top of hierarchy, container for all other components. Manages State.
export default class App extends Component {

  constructor(){
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  };

  //Called on click to close markers
  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    //Reset markers
    this.setState({ markers: Object.assign(this.state.markers, markers) })
  };

  handleMarkerClick = marker => {
    this.closeMarkers();
    //Open marker on click, update state
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    FourSquareAPI.getVenueDetails(marker.id)
    .then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
    });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  }

  //Fetch data from Foursquare, updates state with search results
  searchVenues = () => {
    FourSquareAPI.search({
      near: "Chicago, IL",
      query: "pizza",
      limit: 10
    })
      .then(results => {
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            //Not open when page loads
            isOpen: false,
            isVisible: true,
            id: venue.id
          };
        });
        this.setState({venues, center, markers});
      });
  }
  //Wait until component is rendered
  componentDidMount(){
    this.searchVenues();
  }

  render(){

    if (this.state.hasError) {
      return <div id="Error-alert" aria-label="Error Alert">Oops, Something went wrong!</div>
    } else {
    return (
      <div>
      <header>
        <h1>Chicago Pizza</h1>
      </header>
        <div className="App">
          <ErrorBoundary>
            <SideBar {...this.state} handleListItemClick={this.handleListItemClick} />
            <MapContainer {...this.state} 
            handleMarkerClick={this.handleMarkerClick} />
          </ErrorBoundary>
        </div>
        <footer>
            <p>
              Bootstrapped with Create React App, data from Google Maps API and Foursquare API
            </p> 
          </footer>
      </div>
    );
  }
}
}
