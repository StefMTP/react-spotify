import React from 'react';
import { Container } from 'react-bootstrap';


const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=bebe681f06264278a1b1c0eefad0a6db&response_type=code&redirect_uri=https://spotilite.netlify.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const Login = () => {
    return(
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <a href={AUTH_URL} className="btn btn-success btn-lg">LOGIN WITH SPOTIFY</a>
        </Container>    
        
    );
}

export default Login;