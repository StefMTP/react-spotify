import React from 'react';

const TrackSearchResult = ({ track, chooseTrack }) => {

    const handlePlay = () => {
        chooseTrack(track);
    }

    return (
        <div style={{cursor: 'pointer'}} className='d-flex m-2 align-items-center' onClick={handlePlay}>
            <img src={track.albumUrl} alt={track.title} style={{height: '64px', width: '64px'}} />
            <div className='ml-3'>
            <div>{track.title}</div>
            <div className='text-muted'>{track.artist}</div>
            </div> 
        </div>
    );
}

export default TrackSearchResult;