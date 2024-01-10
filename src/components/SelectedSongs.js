import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class SelectedSongs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acousticness: [],
      danceability: [],
      energy: [],
      instrumentalness: [],
      valence: [],
    };
  }

  removeSelectedSong = song => {
    this.props.removeSelectedSong(song);
  };

  addItem = () => {
    const listItems = this.props.selectedSongs.map((song, i) => {
      return (
        <ListItem key={i} alignItems='flex-start' className='listItem'>
          <ListItemAvatar>
            <Avatar src={song.album.images[2].url} />
          </ListItemAvatar>
          <ListItemText
            classes={{ primary: 'overflow', secondary: 'overflow' }}
            primary={song.name}
            secondary={song.album.name}
          />
          <IconButton aria-label='Delete'>
            <DeleteIcon onClick={this.removeSelectedSong.bind(this, song)} />
          </IconButton>
        </ListItem>
      );
    });
    return <List className='songList'>{listItems}</List>;
  };

  render = () => {
    return <React.Fragment>{this.addItem()}</React.Fragment>;
  };
}

export default SelectedSongs;
