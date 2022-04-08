import React from "react";
//import useAudio from "../hooks/useAudio";
import { Zoom } from "react-awesome-reveal";

import "./css/Bubble.css";

const Bubble = ({ data, token }) => {
  // image data
  const image =
    data.type === "artist" ? data.images[1].url : data.album.images[1].url;
  const image_alt = data.type === "artist" ? data.name : data.album.name;

  //const [songPlaying, setPlaying] = useAudio(data, token);

  return (
    <Zoom direction="bottom" fraction={0.25}>
      <div
        className="bubble"
        // onMouseEnter={() => {
        //   if(!songPlaying) {
        //     setPlaying(true)
        //   }
        // }}
        // onMouseLeave={() => {
        //   if(songPlaying) {
        //     setPlaying(false)
        //   }
        // }}
      >
        <img alt={image_alt} className="ui image" src={image} />
        <h1>{data.name}</h1>
        <p>{data.type === "track" ? data.artists[0].name : null}</p>
      </div>
    </Zoom>
  );
};

export default Bubble;
