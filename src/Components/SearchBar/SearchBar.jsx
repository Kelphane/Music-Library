import React from "react";
import { Component } from "react";

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            filter: "all",
            searchFor: " "
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.searchCriteria(this.state);
    }
    
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="filter">Filter: </label>
                <select name="filter" id="filter" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="title">Title</option>
                    <option value="album">Album</option>
                    <option value="artist">Artist</option>
                    <option value="genre">Genre</option>
                    <option value="releaseDate">Released Date</option>
                </select>

                <input type="search" name="searchFor" onChange={this.handleChange}></input>
            </form>
        );
    }
}

export default SearchBar;