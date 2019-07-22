import React, { Component } from 'react';
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.handleClick = this.handleClick.bind(this);
    }
    
   

    addSelectedSong = (song) => {
      this.props.addSelectedSong(song);
    }

    updateSliders = (val, name) => {
        this.props.updateSliders(val, name);
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
              return resp.data.devices[0].id
            }
            throw Error('Cannot find an available device to play on.')
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
          console.log(href);
          window.open(href, '_blank');
        });
    };
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
                            <PlayArrow onClick={() => {this.handleClick(song.uri, song.external_urls.spotify)}}/>
                        </Fab>
                        <Fab color="primary" aria-label="Add" size="small">
                            <AddIcon  onClick={() => {this.addSelectedSong(song)}}/>
                        </Fab>
                    </ListItem>;
        });
        return ( 
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