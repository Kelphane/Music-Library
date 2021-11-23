import React from "react";
import { Component } from "react";

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <label htmlFor="filter">Filter: </label>

                <select name="filter" id="filter">
                    <option value="">--Please choose an option--</option>
                    <option value="title">Title</option>
                    <option value="album">Album</option>
                    <option value="artist">Artist</option>
                    <option value="genre">Genre</option>
                    <option value="releasedDate">Released Date</option>
                </select>
            </div>
        );
    }
}

export default SearchBar;