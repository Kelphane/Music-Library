import React, {Component} from "react";
import NavBar from "./Components/NavBar/NavBar";
import MusicTable from "./Components/MusicTable/MusicTable";
import Axios from "axios";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            filter: "all",
            searchFor: "",
            searchResults: [],
            searchSaved: []
        };
    }

    componentDidMount(){
        this.fetchMusic();
    }

    //GETs a Music List from API:
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
    
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    //Filters the Saved Search by User's Criteria:
    handleSubmit = (event) => {
        event.preventDefault();
        let modifiedSearch = [];
        
        if(this.state.filter === "all" && this.state.searchFor === ""){
            modifiedSearch = this.state.searchSaved;
        }else if(this.state.filter === "all" && this.state.searchFor !== ""){
            modifiedSearch = this.state.searchSaved.filter(results => {
                if(results.title === this.state.searchFor){
                    return true;
                }else if(results.album === this.state.searchFor){
                    return true;
                }else if(results.artist === this.state.searchFor){
                    return true;
                }else if(results.genre === this.state.searchFor){
                    return true;
                }else if(results.reaseDate === this.state.searchFor){
                    return true;
                }
            });
        }else{
            modifiedSearch = this.state.searchSaved.filter(results => {
                if(results[this.state.filter] === this.state.searchFor){
                    return true;
                }else{
                    return false;
                }
            });
        }

        this.setState({searchResults: modifiedSearch});
    }

    render(){
        return (
            <div>
                <NavBar 
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <MusicTable searchResults={this.state.searchResults}/>
            </div>
        );
    }
}

export default App;