import React from 'react';

import BubblesList from './BubblesList';
import './css/App.css'

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = "ffa134402f974b84b32367f0e4a7babb";
// Switch to localhost when testing locally
//const redirectUri = "http://localhost:3000/";
const redirectUri = "https://upbeat-meninsky-7a86df.netlify.app";
const scopes = [
  "user-top-read"
]

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

class App extends React.Component {
  state = { token: null }
  // Note that the component unmounts when the user clicks login into spotify, then remounts after logging in
  componentDidMount() {
     let token = hash.access_token;
     if (token) {
       this.setState({
         token: token
       });
     }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        {!this.state.token && (
          <div id='login'>
            <h1>PopBubbles</h1>
            <p>View your top artists and top tracks overtime. Anytime, Anywhere</p>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          </div>
        )}
        {this.state.token && (
          <BubblesList token={this.state.token} />
        )}
        </header>
      </div>
    );
  }  
}

export default App