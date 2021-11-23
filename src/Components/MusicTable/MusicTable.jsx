import React from "react";

const MusicTable = (props) => {
    
    return(
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
    );
}

export default MusicTable;