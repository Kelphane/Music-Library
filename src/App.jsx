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
            initialSearch: false,
            ascending: false,
            searchResults: [],
            searchSaved: [],
            toggleForm: false,
            title: "",
            album: "",
            artist: "",
            genre: "",
            releaseDate: ""
        };
    }

    componentDidMount(){
        this.fetchMusic();
    }

    //GETs a Music List from API:
    async fetchMusic(){
        try{
            let searchQuery = await Axios.get('http://localhost:3002/api/songs');
            let dataList = searchQuery.data;
            this.setState({
                searchSaved: dataList
            });
        }catch(error){
            console.log(error);
        }
    }

    //Listens for User's Input.
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    //Searches the List with the User's Filter
    handleSubmit = (event) => {
        event.preventDefault();
        let modifiedSearch = [];
        let criteria = this.state.searchFor;
        
        if(this.state.filter === "all" && criteria === ""){
            modifiedSearch = this.state.searchSaved;
        }else if(this.state.filter === "all" && this.state.searchFor !== ""){
            modifiedSearch = this.state.searchSaved.filter(function(results){
                if(results.title.indexOf(criteria) !== -1){
                    return true;
                }else if(results.album.indexOf(criteria) !== -1){
                    return true;
                }else if(results.artist.indexOf(criteria) !== -1){
                    return true;
                }else if(results.genre.indexOf(criteria) !== -1){
                    return true;
                }else if(results.releaseDate.indexOf(criteria) !== -1){
                    return true;
                }else{
                    return false;
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

        this.setState({
            searchResults: modifiedSearch, 
            initialSearch: true,
            toggleForm: false
        });
    }

    //Rearranges the list to be (Ascending or Descending) Alphabetical or Numerical.
    handleSort = (event) => {
        let searchCopy = this.state.searchResults;
        let savedIndex = {};

        for(let i = 0; i < searchCopy.length; i++){
            for(let j = 0; j < searchCopy.length; j++){
                if(j !== i && this.state.ascending === false && searchCopy[i][event.target.name] < searchCopy[j][event.target.name]){
                    savedIndex = searchCopy[i];
                    searchCopy[i] = searchCopy[j];
                    searchCopy[j] = savedIndex;
                }else if(j !== i && this.state.ascending === true && searchCopy[i][event.target.name] > searchCopy[j][event.target.name]){
                    savedIndex = searchCopy[i];
                    searchCopy[i] = searchCopy[j];
                    searchCopy[j] = savedIndex;
                }
            }
        }

        this.setState({searchResults: searchCopy, ascending: !this.state.ascending});
    }

    //Toggle State Value toggleForm.
    toggleAddSong = () => {
        this.setState({toggleForm: !this.state.toggleForm});
    }

    //Submit New Song.
    handleNewSong = (event) =>{
        event.preventDefault();
        
        try {
            Axios.post('http://localhost:3002/api/songs', 
                {
                    title: this.state.title,
                    album: this.state.album,
                    artist: this.state.artist,
                    genre: this.state.genre,
                    releaseDate: this.state.releaseDate
                }
            );
            alert("Song Submitted!");
            this.setState({
                toggleForm: false,
                initialSearch: false
            });
        } catch (error) {
            console.log(error);
        }
        this.fetchMusic();
    }

    render(){
        return (
            <div>
                <NavBar 
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    toggleAddSong={this.toggleAddSong}
                />
                <MusicTable 
                    searchResults={this.state.searchResults} 
                    initialSearch={this.state.initialSearch}
                    handleSort={this.handleSort}
                    toggleForm={this.state.toggleForm}
                    handleChange={this.handleChange}
                    handleNewSong={this.handleNewSong}
                />
            </div>
        );
    }
}

export default App;