import React, {Component} from "react";
import NavBar from "./Components/NavBar/NavBar";
//import Axios from "axios";

class App extends Component{
    constructor(props){
        super();
        this.state = {
            filter: "",
            searchFor: ""
        };
    }
    
    //Update App's State with Search Cretia Pushed from SearchBar Component.
    searchMusic = (cretia) => {
        let selectedFilter = cretia.filter;
        let selectedSearchFor = cretia.searchFor;

        this.setState({
            filter: selectedFilter,
            searchFor: selectedSearchFor
        });
    }

    render(){
        return (
            <div>
                <NavBar searchMusic={this.searchMusic}/>
            </div>
        );
    }
}

export default App;