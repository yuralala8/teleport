import React from 'react'

class SalaryScore extends React.Component {
	state = {
		selectedJobInput: 'ACCOUNT-MANAGER',
		selectedJobData: {
			job: {
				title: ''
			},
			salary_percentiles: {
				percentile_50: 0
			}
		}
	}

	handleChange = (event) => {
		this.setState({selectedJobInput: event.target.value})
		this.setState({selectedJobData: this.props.salaryData.salaries.find( position => position.job.id === event.target.value)})
	}

	render() {
		const salariesByJobOptions = this.props.salaryData.salaries.map((item, index) => <option value={item.job.id} key={index}> {item.job.title} </option>)
		return (
			<div className="score-wrapper">
				<h2>Salary By Position</h2>
				<select onChange={this.handleChange} value={this.state.selectedJob}>
					{salariesByJobOptions}
				</select>
				{this.state.selectedJobData.job.title !== '' ? 
				<div className="salary-info">
					<span style={{textTransform: 'uppercase', letterSpacing: '1px'}}>Median Salary</span>
					<h4><span>$</span>{Math.round(this.state.selectedJobData.salary_percentiles.percentile_50)}</h4>
				</div>
				: null }
			</div>
			)
	}

}

export default SalaryScore