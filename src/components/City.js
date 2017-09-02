import React from 'react'

class City extends React.Component {

	state = {
		data: '',
		urbanArea: '',
		img: ''
	}

	componentWillMount = () => {
		console.log(this.props)
		this.fetchCityInfo(this.props.geocode.match.params.id)
		// this.fetchUrbanArea(this.state.data._links["city:urban_area"].href)
	}

	fetchCityInfo = (geocode) => {
		const url = `https://api.teleport.org/api/cities/geonameid:${geocode}/`
		fetch(url)
		.then(res => res.json())
		.then( json => this.setState({data: json}, () => {
			this.fetchUrbanArea(this.state.data._links["city:urban_area"].href)
		}))
	}

	fetchUrbanArea = (url) => {
		console.log(url)
		fetch(url).then(res => res.json().then(json => this.setState({urbanArea: json})))
		.then(response => this.fetchImage(this.state.urbanArea._links["ua:images"].href))
	}

	fetchImage = (url) => {
		console.log(url)
		fetch(url).then(response => response.json().then(json => this.setState({img: json.photos[0].image.web})))
	}

	render() {
		console.log(this.state)
		return (
			<div>
			<h1>{this.state.data.name}</h1>
			<p>Population: {this.state.data.population}</p>
			<p>Continent: {this.state.urbanArea.continent}</p>
			<p><img src={this.state.img} alt={this.state.data.name} /></p>
			</div>
			)
	}

}

export default City