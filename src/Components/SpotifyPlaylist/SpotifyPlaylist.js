import React from 'react';
import './SpotifyPlaylist.css';
const SpotifyPlaylist = (props) => {
    return (
        <div className='playlist-container'>
            <ul className='playlist-titles'>
              <li className='list-item' onClick={props.listID}>{props.list}</li>
            </ul>
     
            
        </div>
    );
};

export default SpotifyPlaylist;