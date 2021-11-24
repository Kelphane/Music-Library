import React from "react";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
    return(
        <nav className="nav-bar">
            <SearchBar 
                handleChange={props.handleChange}
                handleSubmit={props.handleSubmit}
            />
        </nav>
    );
}

export default NavBar;