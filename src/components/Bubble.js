import React from 'react'
import { Zoom } from 'react-awesome-reveal'

import './css/Bubble.css'


const Bubble = (props) => {
  const image = props.data.type === 'artist' ? props.data.images[1].url : props.data.album.images[1].url
  const image_alt = props.data.type === 'artist' ? props.data.name : props.data.album.name

  return (
    <Zoom direction="bottom">
      <div 
        className="bubble" 
        onMouseEnter={() => {console.log(props.data.name + ' enter')}}
        onMouseLeave={() => {console.log(props.data.name + ' exit')}}
      >
        <img
          alt={image_alt}
          className="ui image"
          src={image}
        />
        <h1>{props.data.name}</h1>
        <p>{props.data.type === 'track' ? props.data.artists[0].name : null}</p>
      </div>
    </Zoom>
  )
}

export default Bubble;