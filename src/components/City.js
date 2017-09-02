import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class City extends React.Component {

	state = {
		data: {location: {
			latlon: {
				longitude: 0,
				latitude: 0
			}

		}},
		urbanArea: '',
		img: ''
	}

	componentWillMount = () => {
		console.log(this.props)
		this.fetchCityInfo(this.props.geocode.match.params.id)
		// this.fetchUrbanArea(this.state.data._links["city:urban_area"].href)
	}

	componentWillReceiveProps = (nextProps) => {
		this.fetchCityInfo(nextProps.geocode.match.params.id)
	}

	fetchCityInfo = (geocode) => {
		const url = `https://api.teleport.org/api/cities/geonameid:${geocode}/`
		fetch(url)
		.then(res => res.json())
		.then( json => this.setState({data: json}, () => {
			this.fetchUrbanArea(this.state.data._links["city:urban_area"].href)
		})).catch(error => this.setState({urbanArea: {error: 'No associated urban area found'}}))
	}

	fetchUrbanArea = (url) => {
		fetch(url).then(res => res.json().then(json => this.setState({urbanArea: json})))
		.then(response => this.fetchImage(this.state.urbanArea._links["ua:images"].href))
	}

	fetchImage = (url) => {
		fetch(url).then(response => response.json().then(json => this.setState({img: json.photos[0].image.web}))).then(() => this.setState({mapLoaded: true}))
	}

	mapLoaded = () => this.setState({mapLoaded: true})

	render() {
		const CityGoogleMap = withGoogleMap(props => (
  		<GoogleMap  	
		    defaultZoom={10}
		    defaultCenter={{ lat: this.state.data.location.latlon.latitude, lng: this.state.data.location.latlon.longitude }}
		  >
		  </GoogleMap>
		));
		return (
			<div>
			<h1>{this.state.data.name}</h1>
			<p>Population: {this.state.data.population}</p>
			<p>Continent: {this.state.urbanArea.continent}</p>
			<p><img src={this.state.img} alt={this.state.data.name} /></p>
			<p>{this.state.urbanArea.error}</p>
			  {this.state.mapLoaded ? <CityGoogleMap
			  	onMapLoad={this.mapLoaded}
			    containerElement={
			      <div style={{ height: `500px` }} />
			    }
			    mapElement={
			      <div style={{ height: `500px` }} />
			    }
			    defaultCenter={{ lat: this.state.data.location.latlon.latitude, lng: this.state.data.location.latlon.longitude }}
				 /> : null  }
			</div>
			)
	}

}

export default City