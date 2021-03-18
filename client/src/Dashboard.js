import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';


const spotifyApi = new SpotifyWebApi({
    clientId: 'bebe681f06264278a1b1c0eefad0a6db',
})

const Dashboard = ({ code }) => {

    const accessToken = useAuth(code);
    const [search, setSearch] = useState(''); // search term
    const [searchResults, setSearchResults] = useState([]); // search results
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState('');

    const chooseTrack = (track) => {
        setPlayingTrack(track);
        setSearch('');
    }

    // effect hook for getting lyrics
    useEffect(() => {
        if (!playingTrack) return;

        axios
        .get('https://spotify-lite-back.herokuapp.com/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        })
        .then(res => {
            setLyrics(res.data.lyrics);
        });
    }, [playingTrack]);

    // effect hook for the access token
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    // effect hook for search results
    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        // the cancel that is being returned at the end of the effect hook essentially pauses the track search if the user is still typing, and therefore refreshing the search term each time a key is pressed
        let cancel = false;
        
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return;
            setSearchResults(res.body.tracks.items.map(track => {
                // first find the smallest image for each track
                const smallestImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) {
                        return image;
                    } else {
                        return smallest;
                    }
                }, track.album.images[0]);

                // return the data we want for each track
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestImage.url
                }
            }));
        });

        return () => cancel = true;
    }, [search, accessToken]);

    return (
        <Container className='d-flex flex-column py-2' style={{height: '100vh'}}>
            <Form.Control 
                type='search' 
                placeholder='Search for songs or artists' 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                style={{background: '#333', fontSize: "1.5rem"}}
                className="text-light" 
            >
            </Form.Control>
            <div className='flex-grow-1 my-2' style={{overflowY: 'auto'}}>
                {searchResults.map(track => 
                    <TrackSearchResult 
                        track={track} 
                        key={track.uri} 
                        chooseTrack={chooseTrack}
                    />
                )}
                {searchResults.length === 0 && (
                    <div className="text-center" style={{whiteSpace: 'pre'}}>
                        {lyrics}
                    </div>
                )}
            </div>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </Container>
    );
}

export default Dashboard;