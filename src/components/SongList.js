import React, { Component } from 'react';
import PlaySong from './PlaySong.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';

class SongList extends Component{
    constructor(props){
        super(props);
    }

    addSelectedSong = (song) => {
      this.props.addSelectedSong(song);
    }
    updateSliders = (val, name) => {
        this.props.updateSliders(val, name);
    }
    createItems = () => {
        const listItems = this.props.songList.map((song, i) => {
            return  <ListItem key={i} alignItems="flex-start" className='listItem'>
                        <ListItemAvatar>
                            <Avatar src={song.album.images[2].url}/>
                        </ListItemAvatar>
                        <ListItemText
                            classes={{primary:'overflow', secondary:'overflow'}}
                            primary={song.name}
                            secondary={song.artists[0].name}
                        />
                        <Fab color="primary" aria-label="Play_Arrow" size="small" style={{margin:'0 10px'}}>
                            <PlayArrow onClick={() => {PlaySong(song.uri, song.external_urls.spotify)}}/>
                        </Fab>
                        <Fab color="primary" aria-label="Add" size="small">
                            <AddIcon  onClick={() => {this.addSelectedSong(song)}}/>
                        </Fab>
                    </ListItem>;
        });
        return( 
            <List className="songList">
                {listItems}
            </List>
        );
    }

    render = () => { 
        return(
          <React.Fragment>{this.createItems()}</React.Fragment>
        );
    }
}
 
export default SongList;