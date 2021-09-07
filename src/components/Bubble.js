import React from 'react'
import handleViewport from 'react-in-viewport'
import { Zoom } from 'react-awesome-reveal'

import './css/Bubble.css'


const Bubble = (props) => {
  const image = props.data.type === 'artist' ? props.data.images[1].url : props.data.album.images[1].url
  const image_alt = props.data.type === 'artist' ? props.data.name : props.data.album.name

  const { inViewport, forwardedRef, enterCount} = props;
  if(inViewport && enterCount === 1){
    console.log(props.data.name);
  }
  
  return (
    <Zoom direction="bottom">
      <div className="bubble" onClick={() => console.log(props.data.name)}>
        <img
          alt={image_alt}
          className="ui image"
          src={image}
        />
        <h1 ref={forwardedRef}>{props.data.name}</h1>
        <p>{props.data.type === 'track' ? props.data.artists[0].name : null}</p>
      </div>
    </Zoom>
  )
}

const ViewportBubble = handleViewport(Bubble);

export default ViewportBubble;