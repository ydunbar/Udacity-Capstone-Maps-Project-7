/* global google */
//Followed tutorial by Forrest Walker: https://www.youtube.com/watch?v=Q0vzqlnWWZw&index=2&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP
//react-google-maps reference: https://tomchentw.github.io/react-google-maps/

import React, { Component, Fragment } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

//Initialize map and set default view, and if there are markers, renders each
const MapComponent = withScriptjs(

  withGoogleMap(props => ( 
    <GoogleMap
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={{
      lat: parseFloat(props.center.lat),
      lng: parseFloat(props.center.lng)
    }}
    >
    {props.markers && 
      props.markers
      .filter(marker => marker.isVisible)
      .map((marker, index) => {
        const venueInfo = props.venues.find(venue => venue.id === marker.id);
        //Create Markers and InfoWindow
        return (
          <Marker 
          key={index} 
          position={{ lat: marker.lat, lng: marker.lng }} 
          animation={ marker.isOpen ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP }
          onClick={() => props.handleMarkerClick(marker)}
          >
          {marker.isOpen && venueInfo.bestPhoto && ( 
            <InfoWindow>
              <Fragment>
                <img 
                src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} 
                alt={"Venue's Best Snap"}
                />
                <h2>{venueInfo.name}</h2>  
                <p>{venueInfo.location['address']}</p>
                <p>{venueInfo.rating && <span>Rating: {venueInfo.rating}</span>}</p>
                <p class="credits">Data from FourSquare</p>
              </Fragment>
            </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  ))
);

export default class MapContainer extends Component {
  componentDidMount () {
    window.gm_authFailure = () => {
      window.alert("Google Maps API error")
    }
  }

  render(){
    return (
      <MapComponent
      {...this.props}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAB05q-4T4zTBQu3zImU8LLGldCqQ0rBcc"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%`, width: `75%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      role="application" 
      aria-label="map"
      aria-hidden="true"
      id="map"
      />
    );
  }
}

