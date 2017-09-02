import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Search from './components/Search'
import City from './components/City'
import SearchResults from './components/SearchResults'
import { Route } from 'react-router-dom';


class App extends Component {
  constructor(){
    super();

    this.state = {
      input: "",
      searchResults: []
    }

  }

    handleSearch = (searchTerm) => {
      console.log('running a search now')
      this.fetchData(searchTerm)
  }


  fetchData = (searchTerm) => {
    let term = searchTerm.toLowerCase().replace(/\s/g, '%20')
    let URL = `https://api.teleport.org/api/cities/?search=${term}`
    fetch(URL)
    .then(response => response.json())
    .then(response => this.setState({ searchResults: response._embedded["city:search-results"] }))

  }

  render() {
    // console.log(this.state)
    return (
      <div>
      <Search onSearch={this.handleSearch}/>
      <SearchResults results={this.state.searchResults} />
      <Route exact path="/search/:id" render={(match) => <City geocode={match}/>}/>
      </div>
    );
  }
}


// render={(match)=> <div>{console.log(match)}</div>}

export default App;
