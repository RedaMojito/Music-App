import React from 'react';
import './SpotifyCurrent.css';
const SpotifyCurrent = (props) => {
    return (
        <div className='main-container'>
        <div className='now-playing'> Now Playing : {props.currentTrack}</div>
        <img className='cover' src={props.currentCover} ></img>
        <button className='check-playing' onClick={props.checkCurrent} >Check Now Playing</button>
        </div>
    );
};

export default SpotifyCurrent;