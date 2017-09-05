import React from 'react';
import { Route } from 'react-router-dom';


const CompareDropdown = (props) => {

	let allCities = props.allUrbanAreas.map((city, index) => <option value={city.href} key={index}> {city.name} </option> )

		return(
			<div>
			<Route render={({ history }) => (
				<div style={{float: 'right', marginTop: '1em', marginRight: '1em'}}>
					<span>Compare with: </span>
					<select onChange={(event) => {history.push(`/compare-cities/${event.target.value.split('g:')[1].slice(0, -1)}` + `-and-` + `${props.currentUrbanArea.split('g:')[1]}`)}}>
						{allCities}
					</select>
				</div>
					)}

			/>
			</div>
		)
	
}

export default CompareDropdown

CompareDropdown.defaultProps = {
	allUrbanAreas: []
}