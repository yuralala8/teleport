import React from 'react'

class LifeQualityScore extends React.Component {
	render() {
	const scores = this.props.scoreData.categories.map((score, index) => 
		<div className="rating-wrapper" key={index}><span>{score.name}</span><div className="rating-bar"><div style={{width: `${Math.round(score.score_out_of_10) * 10}` + "%", backgroundColor: score.color}} className="bar"></div></div></div>
	)
		return (
			<div className="score-wrapper">
				<h2>Summary</h2>
				<div style={{display: "flex", justifyContent: "space-around"}}>
				<span>Population: {this.props.population}</span>
				<span>Continent: {this.props.continent}</span>
				<span>Timezone: {this.props.timezone}</span>
				</div>
				<p />
				<div className="summary" dangerouslySetInnerHTML= {{__html: this.props.scoreData.summary}} />
	
				
				<h2>Life Quality Scores</h2>
				<div className="scores">
					{ scores }
				</div>
			</div>
			)
	}

}

export default LifeQualityScore