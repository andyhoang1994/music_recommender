import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import OpenInNew from '@material-ui/icons/OpenInNew';
import TextField from '@material-ui/core/TextField';

class CreatePlaylist extends Component {
  constructor(props) {
    super(props);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      error: null,
      isReturned: false,
      spotifyUser: null,
      playlistNameInputValue: '',
      playlistUrl: '',
    };
  }

  componentDidMount = () => {
    this.getUserId();
  };

  handleChange = e => {
    this.setState({ playlistNameInputValue: e.target.value });
  };

  buildSongUriArray = songs => {
    let uriArray = [];
    songs.map(song => uriArray.push(song.uri));
    return uriArray;
  };

  getUserId = () => {
    let self = this;
    this.props.spotify.getMe().then(
      function (response) {
        self.setState({
          spotifyUser: response,
        });
      },
      function (error) {
        console.error(error);
      },
    );
  };

  fillPlaylist = playlistID => {
    this.props.spotify
      .addTracksToPlaylist(
        playlistID,
        this.buildSongUriArray(this.props.recommendedList),
      )
      .then(
        function () {},
        function (error) {
          console.error(error);
        },
      );
  };

  getPlaylist = () => {
    let self = this;
    let playlistName =
      this.state.playlistNameInputValue !== ''
        ? this.state.playlistNameInputValue
        : 'New Playlist';
    this.props.spotify
      .createPlaylist(this.state.spotifyUser.id, {
        name: playlistName + ' (Created by Recommender)',
        public: true,
      })
      .then(
        function (response) {
          self.fillPlaylist(response.id);
          self.setState({ playlistUrl: response.external_urls.spotify });
        },
        function (error) {
          console.error(error);
        },
      );
  };

  render() {
    if (this.state.spotifyUser != null) {
      return (
        <div className='create_playlist' style={{ margin: '20px 0' }}>
          <TextField
            label='Playlist Name'
            value={this.state.playlistNameInputValue}
            onChange={this.handleChange}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={this.getPlaylist}
          >
            Create Playlist
            <SaveIcon className='rightIcon' />
          </Button>
          <div>
            {this.state.playlistUrl !== '' ? (
              <Button
                className='open_playlist'
                variant='contained'
                href={this.state.playlistUrl}
                target='_blank'
              >
                Open Playlist
                <OpenInNew className='rightIcon' />
              </Button>
            ) : (
              <React.Fragment />
            )}
          </div>
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

export default CreatePlaylist;
