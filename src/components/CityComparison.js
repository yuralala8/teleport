import React from 'react';


class CityComparison extends React.Component {

	state = {
		cityData: {
			current: {image: '', categories: [{score_out_of_10:0}], teleport_city_score: 0},
			selected: {image: '', categories: [{score_out_of_10: 0}], teleport_city_score: 0}
		},
		currentCityName: this.props.cities.match.params.cities.split('-and-')[1],
		selectedCityName: this.props.cities.match.params.cities.split('-and-')[0],
	}

	componentWillMount = () => {
		this.fetchCityData()
	}

	fetchCityData = () => {
		const currentCity = this.props.cities.match.params.cities.split('-and-')[1]
		const selectedCity = this.props.cities.match.params.cities.split('-and-')[0]
		const url = 'https://api.teleport.org/api/urban_areas/slug:'
		fetch(url + currentCity + '/scores/').then(res => res.json()
			.then(json => this.setState({cityData: {
				...this.state.cityData,
				current: json
			}})))
			.then(response => this.fetchImageCurrent(url + currentCity + '/images'))
		fetch(url + selectedCity + '/scores/').then(res => res.json()
			.then(json => this.setState({cityData: {
				...this.state.cityData,
				selected: json
			}})))
			.then(response => this.fetchImageSelected(url + selectedCity + '/images'))
	}

	fetchImageCurrent = (url) => {
		fetch(url).then(response => response.json()
			.then(json => this.setState({
				cityData: {
					...this.state.cityData,
					current: {
						...this.state.cityData.current,
						image: json.photos[0].image.web
					}
					
				}
			})))
	}

	fetchImageSelected = (url) => {
		fetch(url).then(response => response.json()
			.then(json => this.setState({
				cityData: {
					...this.state.cityData,
					selected: {
						...this.state.cityData.selected,
						image: json.photos[0].image.web
					}
					
				}
			})))
	}

	render() {
		console.log(this.state)
		const currentRatings = this.state.cityData.current.categories.map((data, index) => 
			<div className="comparison-rating" key={index}>
				<h2>{data.name}</h2>
				<div className="half">{data.score_out_of_10.toFixed(2)}</div>
				<div className="rating-wrapper"><div className="rating-bar"><div style={{width: `${Math.round(data.score_out_of_10) * 10}` + "%", backgroundColor: data.color}} className="bar"></div></div></div>
			</div>
			)

		const selectedRatings = this.state.cityData.selected.categories.map((data, index) => 
			<div className="comparison-rating" key={index}>
				<h2>{data.name}</h2>
				<div className="half">{data.score_out_of_10.toFixed(2)}</div>
				<div className="rating-wrapper"><div className="rating-bar"><div style={{width: `${Math.round(data.score_out_of_10) * 10}` + "%", backgroundColor: data.color}} className="bar"></div></div></div>
			</div>
			)

		return (
			<div>
				<h1 style={{textTransform: 'capitalize', textAlign: 'center'}}>Comparing {this.state.currentCityName} and {this.state.selectedCityName}</h1>
				<div className="comparison-header">
					<div className="comparison-img" style={{position: 'relative', backgroundImage: 'url(' + this.state.cityData.current.image + ')', backgroundSize: 'cover', backgroundPosition: 'center'}}>
						<h2>{this.state.currentCityName}</h2>
					</div>
					<div className="comparison-img" style={{position: 'relative', backgroundImage: 'url(' + this.state.cityData.selected.image + ')', backgroundSize: 'cover', backgroundPosition: 'center'}}>
						<h2>{this.state.selectedCityName}</h2>
					</div>
				</div>
				<div className="score-wrapper" style={{display: 'flex', flexWrap: 'wrap'}}>
					<div className="half"> {currentRatings} <h3>Total Teleport Score: <br />{this.state.cityData.current.teleport_city_score.toFixed(2)}</h3></div>
					<div className="half"> {selectedRatings} <h3>Total Teleport Score: <br />{this.state.cityData.selected.teleport_city_score.toFixed(2)}</h3></div>

				</div>
			</div>
			)
	}
}


export default CityComparison

