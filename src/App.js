import React, { Component } from 'react';
import Body from './components/Body.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.invalidateToken = this.invalidateToken.bind(this);

    this.state = {
      haveToken: this.props.accessToken ? true : false,
      tokenValid: true,
    };
  }

  invalidateToken() {
    this.setState({ tokenValid: false });
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Music Recommender</h1>
          <h4>A web app for finding songs of your preference</h4>
          <h4>
            Code available at{' '}
            <a href='https://github.com/andyhoang1994/music_recommender'>
              https://github.com/andyhoang1994/music_recommender
            </a>
          </h4>
        </header>
        <Body
          token={this.props.accessToken}
          haveToken={this.state.haveToken}
          tokenValid={this.state.tokenValid}
          invalidateToken={this.invalidateToken}
        />
      </div>
    );
  }
}

export default App;
