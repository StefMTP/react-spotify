import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    // effect hook for login
    useEffect(() => {
        axios
        .post('https://spotify-lite-back.herokuapp.com/login', {
            code,
        })
        .then(res => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, null, '/')
        })
        .catch(err => window.location = '/');
    }, [code]);

    // effect hook to send the refresh token to the refresh url
    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const expiration = setInterval(() => {
            axios
            .post('https://spotify-lite-back.herokuapp.com/refresh', {
            refreshToken,
            })
            .then(res => {
                setAccessToken(res.data.accessToken);
                setExpiresIn(res.data.expiresIn);
            })
            .catch(err => window.location = '/');
        }, (1000*(expiresIn - 60)));

        return () => clearInterval(expiration);
    }, [refreshToken, expiresIn]);

    return accessToken;
}

export default useAuth;