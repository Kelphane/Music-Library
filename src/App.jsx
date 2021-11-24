import React, {Component} from "react";
import NavBar from "./Components/NavBar/NavBar";
import MusicTable from "./Components/MusicTable/MusicTable";
import Axios from "axios";

class App extends Component{
    constructor(props){
        super();
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

    handleSubmit = (event) => {
        event.preventDefault();
        
        let modifiedSearch = this.state.searchSaved.filter(results => {
            if(this.state.filter === "all" && this.state.searchFor === ""){
                return true;
            }else if(results[this.state.filter] === this.state.searchFor){
                return true;
            }else{
                return false;
            }
        });

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