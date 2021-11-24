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
        console.log("State Changed!");
        console.log(this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.searchCriteria(this.state);
        console.log("Submitted!");
    }
    
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Filter: 
                    <select name="filter" value={this.state.filter} onChange={this.handleChange}>
                        <option value="all">All</option>
                        <option value="title">Title</option>
                        <option value="album">Album</option>
                        <option value="artist">Artist</option>
                        <option value="genre">Genre</option>
                        <option value="releaseDate">Released Date</option>
                    </select>
                </label>

                <input type="search" name="searchFor" onChange={this.handleChange}></input>
                <input type="submit" value="Search" />
            </form>
        );
    }
}

export default SearchBar;