import React from 'react'
import { withGoogleMap, GoogleMap } from "react-google-maps";
import LifeQualityScore from './LifeQualityScore'
import SalaryScore from './SalaryScore'
import CompareDropdown from './CompareDropdown'

class City extends React.Component {

	state = {
		data: {location: {
			latlon: {
				longitude: 0,
				latitude: 0

			}

		},
		_links: {
			['city:timezone']: {
				name: ""
			},

			['city:urban_area']: {
				href: ""
		}
	}
		
	},
		urbanArea: '',
		img: '',
		scoreData: {categories: []},
		salaryData: {salaries: []},
		allUrbanAreas: []
	}

	componentWillMount = () => {
		console.log(this.props)
		this.fetchCityInfo(this.props.geocode.match.params.id)
		this.fetchAllUrbanAreas()
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
		})).catch(error => this.setState({
			// this is pretty rough and should just be refactor into some default state

			urbanArea: {
				error: 'No associated urban area found'
			}, 
		data: {
			...this.state.data,
			_links: {
				["city:urban_area"]: {
				href: ''
					},
				["city:timezone"]: {
					name: ''
				}
				}
			}
		}
		))
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

	fetchAllUrbanAreas = () => {
		let url = 'https://api.teleport.org/api/urban_areas'
		fetch(url)
		.then(res => res.json())
		.then(json => this.setState({allUrbanAreas: json._links["ua:item"]}))
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
			<CompareDropdown allUrbanAreas={this.state.allUrbanAreas} currentUrbanArea={this.state.data._links["city:urban_area"].href}/>
			<div className="score-wrapper">
					<p style={{color: 'red'}}>{this.state.urbanArea.error}</p>
			</div>
			<LifeQualityScore scoreData={this.state.scoreData} population={this.state.data.population} continent={this.state.urbanArea.continent} timezone={this.state.data._links["city:timezone"].name}/>
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