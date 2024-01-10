import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import GetToken from './GetToken.js';
import Sliders from './Sliders.js';
import GetSongs from './GetSongs.js';
import Search from './Search.js';
import SongList from './SongList.js';
import SelectedSongs from './SelectedSongs.js';

class Body extends Component {
  constructor(props) {
    super(props);
    this.spotify = new Spotify();
    if (this.props.haveToken) {
      this.spotify.setAccessToken(this.props.token);
    }
    localStorage.setItem('access_token', this.props.token);
    this.state = {
      chosenGenres: [],
      acousticness: (0.5).toFixed(2),
      danceability: (0.5).toFixed(2),
      energy: (0.5).toFixed(2),
      instrumentalness: (0.5).toFixed(2),
      valence: (0.5).toFixed(2),
      songList: [],
      recommendedList: [],
      selectedSongs: [],
      songListNeedsUpdate: true,
    };
  }

  updateSongList = songList => {
    this.setState({ songList: songList });
    console.log('songList:', songList);
  };
  updateRecommended = songs => {
    this.setState({ recommendedList: songs });
  };
  addSelectedSong = newSong => {
    if (this.state.selectedSongs.length < 5) {
      if (this.state.selectedSongs.includes(newSong) === false) {
        let newArr = this.state.selectedSongs.concat(newSong);
        this.setState({ selectedSongs: newArr }, () => {
          this.recalcValues();
        });
      }
    }
  };
  removeSelectedSong = song => {
    var newArr = [...this.state.selectedSongs];
    var index = newArr.indexOf(song);
    if (index !== -1) {
      newArr.splice(index, 1);
      this.setState({ selectedSongs: newArr }, () => {
        this.recalcValues();
      });
    }
  };
  updateSliders = (val, name) => {
    if (val === 'NaN') val = 0;
    this.setState({
      [name]: parseFloat(val).toFixed(2),
      songListNeedsUpdate: true,
    });
  };
  recalcValues = () => {
    let self = this;

    let seedID = [];
    let avgAcousticness = 0;
    let avgDanceability = 0;
    let avgEnergy = 0;
    let avgInstrumentalness = 0;
    let avgValence = 0;

    this.state.selectedSongs.map((selectedSongs, i) => {
      return (seedID = seedID.concat(selectedSongs.id));
    });

    this.spotify.getAudioFeaturesForTracks(seedID, function (error, data) {
      var i = seedID.length;

      if (error) console.log(error);
      else {
        if (seedID.length > 0) {
          data.audio_features.map(song => {
            if (song != null) {
              avgAcousticness += song.acousticness;
              avgDanceability += song.danceability;
              avgEnergy += song.energy;
              avgInstrumentalness += song.instrumentalness;
              avgValence += song.valence;
            } else i--;
          });
        }
        avgAcousticness = (avgAcousticness / i).toFixed(2);
        self.updateSliders(avgAcousticness, 'acousticness');
        avgDanceability = (avgDanceability / i).toFixed(2);
        self.updateSliders(avgDanceability, 'danceability');
        avgEnergy = (avgEnergy / i).toFixed(2);
        self.updateSliders(avgEnergy, 'energy');
        avgInstrumentalness = (avgInstrumentalness / i).toFixed(2);
        self.updateSliders(avgInstrumentalness, 'instrumentalness');
        avgValence = (avgValence / i).toFixed(2);
        self.updateSliders(avgValence, 'valence');
      }
    });
  };

  render() {
    this.seedCount = this.state.chosenGenres.length;
    if (!this.props.haveToken || !this.props.tokenValid) {
      return (
        <div className='bodyContainer'>
          <GetToken />
        </div>
      );
    } else {
      return (
        <div className='bodyContainer'>
          <div className='searchBox'>
            <Search
              spotify={this.spotify}
              getSearchResults={this.getSearchResults}
              updateSongList={this.updateSongList}
            />
            <SongList
              spotify={this.spotify}
              songList={this.state.songList}
              addSelectedSong={this.addSelectedSong}
              selectedSongs={this.state.selectedSongs}
              acousticness={this.state.acousticness}
              danceability={this.state.danceability}
              energy={this.state.energy}
              instrumentalness={this.state.instrumentalness}
              valence={this.state.valence}
              updateSliders={this.updateSliders}
            />
          </div>
          <div className='recommendBox'>
            <div className='selectedBox'>
              <SelectedSongs
                spotify={this.spotify}
                selectedSongs={this.state.selectedSongs}
                removeSelectedSong={this.removeSelectedSong}
                acousticness={this.state.acousticness}
                danceability={this.state.danceability}
                energy={this.state.energy}
                instrumentalness={this.state.instrumentalness}
                valence={this.state.valence}
              />
            </div>
            <Sliders
              acousticness={this.state.acousticness}
              danceability={this.state.danceability}
              energy={this.state.energy}
              instrumentalness={this.state.instrumentalness}
              valence={this.state.valence}
              updateSliders={this.updateSliders}
            />
            <GetSongs
              spotify={this.spotify}
              selectedSongs={this.state.selectedSongs}
              removeSelectedSong={this.removeSelectedSong}
              acousticness={this.state.acousticness}
              danceability={this.state.danceability}
              energy={this.state.energy}
              instrumentalness={this.state.instrumentalness}
              valence={this.state.valence}
              updateRecommended={this.updateRecommended}
              recommendedList={this.state.recommendedList}
            />
          </div>
        </div>
      );
    }
  }
}

export default Body;
