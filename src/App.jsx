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
            addSong: false,
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
                }else if(results.releaseDate === this.state.searchFor){
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
            initialSearch: true
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

    //Toggle State Value addSong.
    toggleAddSong = () => {
        this.setState({addSong: !this.state.addSong});
    }

    //Submit New Song.
    handleNewSong = (event) =>{
        event.preventDefault();
        
        try {
            console.log("Submit Success!");
            Axios.post('http://localhost:3002/api/songs', 
                {
                    title: this.state.title,
                    album: this.state.album,
                    artist: this.state.artist,
                    genre: this.state.genre,
                    releaseDate: this.state.releaseDate
                }
            );
            this.fetchMusic();
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        console.log(this.state);
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
                    addSong={this.state.addSong}
                    handleChange={this.handleChange}
                    handleNewSong={this.handleNewSong}
                />
            </div>
        );
    }
}

export default App;