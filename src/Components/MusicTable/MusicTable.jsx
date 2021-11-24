import React from "react";
import "./MusicTable.css";
import image from "../../photos/no_results_pic.png";

const MusicTable = (props) => {
    
    if(props.searchResults.length === 0){
        return(
            <div className="placeholder">
                <h3>No Results Found!</h3>
                <img 
                    src={image}
                    alt="No Results Found!" 
                />
            </div>
        );
    }else{
        return(
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Album</td>
                            <td>Artist</td>
                            <td>Genre</td>
                            <td>Released Date</td>
                        </tr>
                    </thead>
    
                    <tbody>
                        {props.searchResults.map(results => {
                            return (
                                <tr key={results.id}>
                                    <td>{results.title}</td>
                                    <td>{results.album}</td>
                                    <td>{results.artist}</td>
                                    <td>{results.genre}</td>
                                    <td>{results.releaseDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MusicTable;