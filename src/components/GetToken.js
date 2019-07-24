import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class GetToken extends Component{

    tokenRequestUrl(){
        const apiUrl = 'https://accounts.spotify.com/authorize';
        const clientId = '4a12399447fb43f3a7e85bde067b6743'; //Enter you Spotify app client ID
        const redirectUri = 'https://andyhoang1994.github.io/music_recommender'; //Enter your redirect uri that you've inputted into your Spotify app;
        const responseType = 'token';   
        const requestUrl = 
            apiUrl +
            '?client_id=' + clientId +
            '&redirect_uri=' + redirectUri +
            '&response_type=' + responseType
        ;     
        return requestUrl;
    }

    render(){
        return(
            <Button  variant="contained" color="primary" className="get_token" target = "" href={this.tokenRequestUrl()}>Authorize Spotify</Button>
        );
    }
}

export default GetToken