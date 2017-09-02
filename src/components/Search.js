import React from 'react';

class Search extends React.Component {
	constructor(){
		super()

		this.state = {
			input: ""
		}
	}

	handleClick = () => {
		this.props.onSearch(this.state.input)
		}

	handleInput = (event) => {
		this.setState({
			input: event.target.value
		})
	}

	render(){
		return(
			<div>
				<input type="text" value={this.state.input} onChange={this.handleInput}/>
				<input type="submit" onClick={this.handleClick}/>
			</div>
			)
	}


}


export default Search