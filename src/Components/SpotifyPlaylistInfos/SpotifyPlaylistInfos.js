import React from 'react';
import './SpotifyPlaylistInfos.css'
const SpotifyPlaylistInfos = (props) => {
    return (
        <div className='playlistInfos-container'>
            <img className='playlistInfos-cover' src={props.cover}></img>
            <div className='playlistInfos-details'>
                <div className='playlistInfos-title'> PLAYLIST</div>
                <h1 className='playlistInfos-name'>{props.playlistName}</h1>
                <div>Created by {props.playlistOwner}</div>
                <button className='playlistInfos-button'>PLAY</button>

          
            </div>
          

        </div>
    );
};

export default SpotifyPlaylistInfos;