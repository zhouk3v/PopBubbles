import React from "react";
import crypto from "crypto";

import BubblesList from "./BubblesList";
import "./css/App.css";

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "ffa134402f974b84b32367f0e4a7babb";
// Switch to localhost when testing locally
const redirectUri = "http://localhost:3000/";
//const redirectUri = "https://popbubbles.netlify.app";
const scopes = ["user-top-read"];

class App extends React.Component {
  constructor() {
    super();
    this.token = localStorage.getItem("accesstoken");
    this.state = {
      tokenExists: this.token ? true : false,
      stateValid: false,
      urlState: null,
      codeChallenge: null,
      validState: true,
    };
  }

  componentDidMount() {
    if (this.token === null) {
      // Start the process of requesting a new token through PKCE authorization flow
      this.handleRedirect();
    } else {
      // If token is expired, renew it
      this.setState({ tokenExists: true });
    }
  }

  base64Encode(str) {
    return str
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest();
  }

  async generateNewToken(code) {
    // Grab the code verifier from session storage
    const codeVerifier = sessionStorage.getItem("codeVerifier");
    // Send a POST request with the code to get an access token, refresh token and
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    const json = await res.json();

    // Store the token into local storage
    localStorage.setItem("accesstoken", json.access_token);

    // Clear the url search params
    window.location.search = "";
  }

  handleRedirect() {
    // Get the search parameters, if any from the url
    const params = new URL(window.location).searchParams;
    const code = params.get("code");
    const urlState = params.get("state");

    // If we were redirected from spotify, we should get 2 search parameters: code and state
    if (code && urlState) {
      // verify the state we got from the redirect url
      if (sessionStorage.getItem("stateString") !== urlState) {
        this.setState({ validState: false });
      } else {
        this.generateNewToken(code);
      }
    } else {
      // Generate a state string and store it in sessionStorage so we can verify it after we get redirected back from spotify
      const urlState = this.base64Encode(crypto.randomBytes(30));
      sessionStorage.setItem("stateString", urlState);

      // Generate code challenge
      const codeVerifier = this.base64Encode(crypto.randomBytes(32));
      sessionStorage.setItem("codeVerifier", codeVerifier);
      const codeChallenge = this.base64Encode(this.sha256(codeVerifier));
      // TODO: think about moving this into the constructor so we don't trigger extra rerenders (might need to move generating login link to constructor in this case)
      this.setState({
        urlState,
        codeChallenge,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.validState && (
            <div>
              <p>ERROR: states do not match!</p>
            </div>
          )}
          {this.state.validState && !this.state.tokenExists && (
            <div id="login">
              <h1>PopBubbles</h1>
              <p>
                View your top artists and top tracks overtime. Anytime, Anywhere
              </p>
              <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=code&show_dialog=true&state=${
                  this.state.urlState
                }&code_challenge_method=S256&code_challenge=${
                  this.state.codeChallenge
                }`}
              >
                Login to Spotify
              </a>
            </div>
          )}
          {this.state.validState && this.state.tokenExists && (
            <BubblesList token={this.token} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
