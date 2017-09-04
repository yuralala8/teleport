import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import LifeQualityScore from './LifeQualityScore'
import SalaryScore from './SalaryScore'

class City extends React.Component {

	state = {
		data: {location: {
			latlon: {
				longitude: 0,
				latitude: 0
			}

		}},
		urbanArea: '',
		img: '',
		scoreData: {categories: []},
		salaryData: {salaries: []},
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
		fetch(url).then(res => res.json()
			.then(json => this.setState({urbanArea: json}, this.fetchScoreData(url))))
			.then(response => this.fetchImage(this.state.urbanArea._links["ua:images"].href))
	}

	fetchScoreData = (url) => {
			fetch(url + 'scores/')
				.then(res => res.json())
				.then(json => this.setState({scoreData: json}, this.fetchSalaryData(url)))
	}

	fetchSalaryData = (url) => {
		fetch(url + 'salaries/')
			.then(res => res.json())
			.then(json => this.setState({salaryData: json}))
	}

	fetchImage = (url) => {
		fetch(url).then(response => response.json()
			.then(json => this.setState({img: json.photos[0].image.web})))
			.then(() => this.setState({mapLoaded: true}
			))
	}

	mapLoaded = () => this.setState({mapLoaded: true})

	render() {
		console.log(this.state)
		const CityGoogleMap = withGoogleMap(props => (
  		<GoogleMap  	
		    defaultZoom={10}
		    defaultCenter={{ lat: this.state.data.location.latlon.latitude, lng: this.state.data.location.latlon.longitude }}
		  >
		  </GoogleMap>
		));
		return (
			<div>
				<div className="city-header" style={{backgroundImage: 'url(' + this.state.img + ')', backgroundSize: 'cover', backgroundPosition: 'center'}}>
					<h1 className="city-title">{this.state.data.name}</h1>
				</div>
			<p style={{color: 'red'}}>{this.state.urbanArea.error}</p>
			<p>Population: {this.state.data.population}</p>
			<p>Continent: {this.state.urbanArea.continent}</p>
			<LifeQualityScore scoreData={this.state.scoreData}/>
			<SalaryScore salaryData={this.state.salaryData} />
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