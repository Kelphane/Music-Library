import React from "react";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
    return(
        <nav className="nav-bar">
            <SearchBar searchCriteria={props.searchCriteria}/>
        </nav>
    );
}

export default NavBar;