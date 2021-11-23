import React, {Component} from "react";
import NavBar from "./Components/NavBar/NavBar";
import Axios from "axios";

class App extends Component{
    constructor(props){
        super();
        this.state = {};
    }

    render(){
        return (
            <div>
                <NavBar />
            </div>
        );
    }
}

export default App;