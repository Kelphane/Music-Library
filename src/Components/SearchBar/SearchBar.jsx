import React from "react";

const SearchBar = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <label>Filter: 
                <select name="filter" onChange={props.handleChange}>
                    <option value="all">All</option>
                    <option value="title">Title</option>
                    <option value="album">Album</option>
                    <option value="artist">Artist</option>
                    <option value="genre">Genre</option>
                    <option value="releaseDate">Released Date</option>
                </select>
            </label>

            <input type="search" name="searchFor" onChange={props.handleChange}/>
            <input type="submit" value="Search" />
        </form>
    );
}

export default SearchBar;