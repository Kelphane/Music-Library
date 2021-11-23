import React, {Component} from "react";
import NavBar from "./Components/NavBar/NavBar";
import MusicTable from "./Components/MusicTable/MusicTable";
import Axios from "axios";

class App extends Component{
    constructor(props){
        super();
        this.state = {
            filter: "",
            searchFor: "",
            searchResults: [],
            searchSaved: []
        };
    }

    //TO-DO
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
            
        }catch(error){
            console.log(error);
        }
    }
    
    //Update App's State with Search Criteria Pushed from SearchBar Component.
    searchCriteria = (criteria) => {
        let selectedFilter = criteria.filter;
        let selectedSearchFor = criteria.searchFor;

        this.setState({
            filter: selectedFilter,
            searchFor: selectedSearchFor
        });

        this.filterSearch();
    }

    //Creates a New Array that has been Filtered by User Criteria.
    filterSearch = () => {
        let modifiedSearch = this.state.searchSaved.filter(results => {
            if(this.state.filter === "all"){
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