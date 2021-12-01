import React from "react";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
    return(
        <nav className="nav-bar">
            <h1>Music Library</h1>
            <SearchBar 
                handleChange={props.handleChange}
                handleSubmit={props.handleSubmit}
            />
            <button onClick={props.toggleAddSong}>Toggle Song Form</button>
        </nav>
    );
}

export default NavBar;