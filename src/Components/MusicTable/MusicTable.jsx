import React from "react";
import "./MusicTable.css";
import noResults from "../../photos/no_results_pic.png";
import beginSearch from "../../photos/Magnifying_Glass.jpg";

const MusicTable = (props) => {
    
    if(props.initialSearch === false){
        return(
            <div className="placeholder">
                <h3>Begin Your Search!</h3>
                <img 
                    src={beginSearch}
                    alt="Begin Your Search!" 
                />
            </div>
        );
    }else if(props.searchResults.length === 0){
        return(
            <div className="placeholder">
                <h3>No Results Found!</h3>
                <img 
                    src={noResults}
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
                            <td>
                                Title
                                <button name="title" onClick={props.handleSort} />
                            </td>
                            <td>
                                Album
                                <button name="album" onClick={props.handleSort} />
                            </td>
                            <td>
                                Artist
                                <button name="artist" onClick={props.handleSort} />
                            </td>
                            <td>
                                Genre
                                <button name="genre" onClick={props.handleSort} />
                            </td>
                            <td>
                                Released Date
                                <button name="releaseDate" onClick={props.handleSort} />
                            </td>
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