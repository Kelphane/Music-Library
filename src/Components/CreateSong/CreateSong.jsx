import React from "react";
import "./CreateSong.css";

const CreateSong = (props) => {

    return (
        <form className="song-form" onSubmit={props.handleNewSong}>
            <h1>Add Song</h1>

            <div className="form-div">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" onChange={props.handleChange} required />
            </div>
            

            <div className="form-div">
                <label htmlFor="album">Album:</label>
                <input type="text" name="album" id="album" onChange={props.handleChange} required />
            </div>
            

            <div className="form-div">
                <label htmlFor="artist">Artist:</label>
                <input type="text" name="artist" id="artist" onChange={props.handleChange} required />
            </div>
            

            <div className="form-div">
                <label htmlFor="genre">Genre:</label>
                <input type="text" name="genre" id="genre" onChange={props.handleChange} required/>
            </div>
            

            <div className="form-div">
                <label htmlFor="releaseDate">Released Date:</label>
                <input type="text" name="releaseDate" id="releaseDate" onChange={props.handleChange} required/> 
            </div>
            
            <button type="Submit">Sumbit</button>
        </form>
    );
}

export default CreateSong;