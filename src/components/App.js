// TODO: Add in error handing for API calls

import React, { useState, useEffect } from "react";
import crypto from "crypto";

import BubblesList from "./BubblesList";
import "./css/App.css";

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "ffa134402f974b84b32367f0e4a7babb";
// Switch to localhost when testing locally
const redirectUri = "http://localhost:3000/";
//const redirectUri = "https://popbubbles.netlify.app";
const scopes = ["user-top-read"];

const base64Encode = (str) => {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

const sha256 = (buffer) => {
  return crypto.createHash("sha256").update(buffer).digest();
};

const storeToken = (json) => {
  // Store the time that we get the access token
  localStorage.setItem("tokenObtainTime", Date.now());

  // Store the access token, refresh token and expiry time into local storage
  localStorage.setItem("accesstoken", json.access_token);
  localStorage.setItem("refreshtoken", json.refresh_token);
  localStorage.setItem("expiresin", json.expires_in);
};

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("accesstoken"));
  const [validState, setValidState] = useState(true);
  const [codeChallenge, setCodeChallenge] = useState(null);
  const [urlState, setUrlState] = useState(null);
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    const generateNewToken = async (code) => {
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
      storeToken(json);
      // Clear the url search params
      window.location.search = "";
      setToken(json.access_token);
    };

    const generateRefreshToken = async () => {
      const refresh_token = localStorage.getItem("refreshtoken");
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: "refresh_token",
          refresh_token,
        }),
      });
      const json = await res.json();
      storeToken(json);
      setToken(json.access_token);
    };

    const tokenExists = localStorage.getItem("accesstoken");
    if (!tokenExists) {
      // Get the search parameters, if any from the url
      const params = new URL(window.location).searchParams;
      const code = params.get("code");
      const urlState = params.get("state");
      // If we were redirected from spotify, we should get 2 search parameters: code and state
      if (code && urlState) {
        // Validate the state in the redirectUri
        const savedState = sessionStorage.getItem("state");
        setValidState(urlState === savedState);
        if (validState) {
          setIsRedirect(true);
          generateNewToken(code);
        }
      } else {
        // Generate state and code challenge
        const newUrlState = base64Encode(crypto.randomBytes(30));
        setUrlState(newUrlState);
        sessionStorage.setItem("state", newUrlState); // store our state in session storage so that we can verify it later
        const codeVerifier = base64Encode(crypto.randomBytes(32));
        sessionStorage.setItem("codeVerifier", codeVerifier);
        setCodeChallenge(base64Encode(sha256(codeVerifier)));
      }
    } else {
      // Check if our token has expired
      const tokenObtainTime = parseInt(localStorage.getItem("tokenObtainTime"));
      const expires_in_sec = parseInt(localStorage.getItem("expiresin")) * 1000;
      if (Date.now() > tokenObtainTime + expires_in_sec) {
        console.log("Token expired");
        generateRefreshToken();
      } else {
        setToken(localStorage.getItem("accesstoken"));
      }
    }
  }, [token, validState]);

  return (
    <div className="App">
      <header className="App-header">
        {!validState && (
          <div>
            <p>ERROR: states do not match!</p>
          </div>
        )}
        {validState && !token && !isRedirect && (
          <div className="login">
            <h1>PopBubbles</h1>
            <p>
              View your top artists and top tracks overtime. Anytime, Anywhere
            </p>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=code&show_dialog=true&state=${urlState}&code_challenge_method=S256&code_challenge=${codeChallenge}`}
            >
              Login to Spotify
            </a>
          </div>
        )}
        {validState && !token && isRedirect && (
          <div className="login">
            <h1>Loading</h1>
          </div>
        )}
        {validState && token && <BubblesList token={token} logout={logout} />}
      </header>
    </div>
  );
};

export default App;
