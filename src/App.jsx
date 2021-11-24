import React, {Component} from "react";
import NavBar from "./Components/NavBar/NavBar";
import MusicTable from "./Components/MusicTable/MusicTable";
import Axios from "axios";

class App extends Component{
    constructor(props){
        super();
        this.state = {
            filter: " ",
            searchFor: " ",
            searchResults: [],
            searchSaved: []
        };
    }

    componentDidMount(){
        this.fetchMusic();
    }

    //GETs a Music List from API.
    async fetchMusic(){
        try{
            let searchQuery = await Axios.get('http://www.devcodecampmusiclibrary.com/api/music');
            let dataList = searchQuery.data;
            this.setState({
                searchSaved: dataList
            });
            console.log("Successfully Received Music List!");
            console.log("Saved Locally!");
        }catch(error){
            console.log(error);
        }
    }
    
    //Update App's State with Search Criteria Pushed from SearchBar Component.
    searchCriteria = (criteria) => {
        let selectedFilter = criteria.filter;
        console.log("Selected Filter: " + selectedFilter);
        console.log(typeof(selectedFilter));

        let selectedSearchFor = criteria.searchFor;
        console.log("Selected Search Criteria: " + selectedSearchFor);
        console.log(typeof(selectedSearchFor));

        this.setState({
            filter: selectedFilter,
            searchFor: selectedSearchFor
        });

        console.log("Criteria Sumbmitted!");
        console.log(this.state);

        this.filterSearch();
    }

    //Creates a New Array that has been Filtered by User Criteria.
    filterSearch = () => {
        console.log("Begining Filter!");
        let modifiedSearch = this.state.searchSaved.filter(results => {
            if(this.state.filter === "all" && this.state.searchFor === " "){
                return true;
            }else if(results[this.state.filter] === this.state.searchFor){
                return true;
            }else{
                return false;
            }
        });

        this.setState({
            searchResults: modifiedSearch
        });
        console.log("Search Filtered!");
        console.log(this.state);
    }

    render(){
        return (
            <div>
                <NavBar searchCriteria={this.searchCriteria}/>
                <MusicTable searchResults={this.state.searchResults}/>
            </div>
        );
    }
}

export default App;