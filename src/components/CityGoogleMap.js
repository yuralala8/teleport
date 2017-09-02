import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyDBPvnUNebPQ2Fdq1dsfJuCAN8GKZZehT4"

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
// const CityGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//   	ref={props.onMapLoad}
//     defaultZoom={10}
//     defaultCenter={props.defaultCenter}
//   >

//   </GoogleMap>
// ));

class CityGoogleMap extends React.Component {
	state = {
		loaded: false
	}

	render() {
	const Map = withGoogleMap(props => (
	 	 <GoogleMap
	  	ref={props.onMapLoad}
	    defaultZoom={10}
	   	defaultCenter={props.defaultCenter}
	 	 >

	  	</GoogleMap>
		))
	return (
		<Map />
		)
	}
}

export default CityGoogleMap