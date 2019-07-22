import React, { Component } from 'react';
import PlaySong from './PlaySong.js';
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

class GetSongs extends Component{
    constructor(props){
        super(props);
        this.getRecommendations = this.getRecommendations.bind(this);
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
            if(error) console.log(error);
            else{
                self.updateRecommended(data.tracks);
                console.log(data.tracks);
            }
        })
        this.createItems();
    }

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
                            <PlayArrow onClick={() => {PlaySong(song.uri, song.external_urls.spotify)}}/>
                        </Fab>
                    </ListItem>;
        });
        return(
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