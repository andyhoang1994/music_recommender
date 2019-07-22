import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

class Search extends Component {
    constructor(props) {
        super(props);
        this.getSearchResults = this.getSearchResults.bind(this);

        this.state = {
            query: '',
        }
    }
    updateSongList(songs) {
        this.props.updateSongList(songs);
    }
    getSearchResults(event) {
        event.preventDefault();
        let self = this;

        this.props.spotify.searchTracks(this.state.query)
            .then(
                function(data){
                    console.log(data);
                    self.updateSongList(data.tracks.items);
                }, function(error){
                    console.error(error);
                }
        )
    }

    handleChange = (e) => {
        this.setState({
            query: e.target.value,
        })
    }

    render() {
        return(
            <form onSubmit={this.getSearchResults}>
                <Input variant="contained" color="primary" onChange={this.handleChange} style={{'margin-top': '20px'}}>
                    Get Search
                    <SearchIcon className="rightIcon" />
                </Input>
                <br/>
                <Button type="submit" variant="outlined" color="primary" style={{margin: '20px'}}>
                    Get Songs
                    <SearchIcon className="rightIcon" />
                </Button>
            </form>
        );
    }
}
export default Search