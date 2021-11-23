import React from "react";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
    return(
        <nav className="nav-bar">
            <SearchBar searchMusic={props.searchMusic}/>
        </nav>
    );
}

export default NavBar;