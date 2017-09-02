import React from 'react';
import { NavLink } from 'react-router-dom'


const SearchResults = (props) => {

	let city = props.results.map((result, index) => <NavLink to={`/search/${result._links["city:item"].href.split('d:')[1]}`} key={index}> {result.matching_full_name}</NavLink>)

		return(

			<div className="search-wrapper">
				{city}
			</div>
			)

}


export default SearchResults;