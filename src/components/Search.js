import React from 'react';

class Search extends React.Component {
	constructor(){
		super()

		this.state = {
			input: ""
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.onSearch(this.state.input)
		this.setState({input: ""})
	}

	handleInput = (event) => {
		this.setState({
			input: event.target.value
		})
	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.input} onChange={this.handleInput}/>
					<input type="submit"/>
				</form>
			</div>
			)
	}


}


export default Search