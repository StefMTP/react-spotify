import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, trackUri }) => {
    const [play, setPlay] = useState();

    useEffect(() => {
        setPlay(true);
    }, [trackUri]);

    return accessToken ? (
        <SpotifyPlayer
            styles={{
                bgColor: '#333',
                color: '#28A745',
                sliderColor: '#28A745',
                sliderTrackColor: '#898989',
                trackNameColor: '#eee',
                trackArtistColor: '#898989',
                sliderHandleColor: '#eee'
            }}
            initialVolume={0.7}
            className="text-light" 
            magnifySliderOnHover
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            uris={trackUri ? [trackUri] : []}
            play={play}
        />
    ) : null;
}

export default Player;