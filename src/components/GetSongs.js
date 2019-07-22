import React, { Component } from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';
import CreatePlaylist from './CreatePlaylist.js';

class GetSongs extends Component {
    constructor(props) {
        super(props);
        this.getRecommendations = this.getRecommendations.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    updateRecommended = (songs) => {
        this.props.updateRecommended(songs);
    }
    getSeedID = (seeds) => {
        let seedID = [];
        seeds.map((seed, i) => {
            return seedID = seedID.concat(seed.id);
        })
        return seedID;
    }

    getRecommendations = () => {
        let self = this;
        let seeds = {
            seed_tracks: this.getSeedID(this.props.selectedSongs),
            target_acousticness: this.props.acousticness,
            target_danceability: this.props.danceability,
            target_energy: this.props.energy,
            target_instrumentalness: this.props.instrumentalness,
            target_valence: this.props.valence,
        }
        this.props.spotify.getRecommendations(seeds, function(error, data) {
            if (error) console.log(error);
            else{
                self.updateRecommended(data.tracks);
                console.log(data.tracks)
            }
        })
        this.createItems();
    }

    handleClick = (uri, href) => {
        axios({
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          url: 'https://api.spotify.com/v1/me/player/devices'
        })
          // Attempt to find recent active / available device from returned array of registered devices
          .then(resp => {
            let index = 0;
            while(resp.data.devices[index]) {
              if (resp.data.devices[index].is_active && !resp.data.devices[index].is_restricted) {
                return resp.data.devices[index].id;
              }
              index++;
            }
            if (typeof resp.data.devices[0] !== 'undefined') {
              return resp.data.devices[0].id;
            }
            throw Error('Cannot find an available device to play on.');
          })
    
          // Play song on first available device, else open browser player
          .then((device) => {
            axios({
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              },
              url: 'https://api.spotify.com/v1/me/player/play',
              method: 'PUT',
              params: {
                device_id: device,
              },
              data: {
                uris: [uri],
              }
            })
              .catch(err => {
                console.log(err);
                if (!err.response.status) return;
                let errorStatus = err.response.status;
                if (errorStatus === 400) {
                }
            })
        })
        .catch(err => {
        console.log(err);
        window.open(href, '_blank');
        });
    };

    createItems = () => {
        const listItems = this.props.recommendedList.map((song, i) => {
            return  <ListItem key={i} alignItems="flex-start" className='listItem'>
                        <ListItemAvatar>
                            <Avatar src={song.album.images[2].url}/>
                        </ListItemAvatar>
                        <ListItemText
                            classes={{primary:'overflow', secondary:'overflow'}}
                            primary={song.name}
                            secondary={song.artists[0].name}
                        />
                        <Fab color="primary" aria-label="Play_Arrow" size="small">
                            <PlayArrow onClick={() => {this.handleClick(song.uri, song.external_urls.spotify)}}/>
                        </Fab>
                    </ListItem>;
        });
        return (
            <React.Fragment>
                <CreatePlaylist
                spotify={this.props.spotify}
                recommendedList={this.props.recommendedList}
                />
                <List className="songList">
                    {listItems}
                </List> 
            </React.Fragment>
        );
    }

    render = () => {
        return(
            <div>
                <Button variant="outlined" color="primary" onClick={this.getRecommendations}>
                    Get Songs
                    <SearchIcon className="rightIcon"/>
                </Button>
                <div>{this.createItems()}</div>
            </div>
        )
    }
}

export default GetSongs