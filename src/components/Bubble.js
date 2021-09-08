import React, {useState, useEffect} from 'react'
import { Zoom } from 'react-awesome-reveal'

import './css/Bubble.css'


const Bubble = ({ data }) => {
  // image data
  const image = data.type === 'artist' ? data.images[1].url : data.album.images[1].url
  const image_alt = data.type === 'artist' ? data.name : data.album.name

  //audio player stuff
  const [audioUrl, setAudioUrl] = useState('')
  const [hover, setHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audio = data.type === 'track' ? new Audio(data.preview_url) : null

  return (
    <Zoom direction="bottom">
      <div 
        className="bubble" 
        onMouseEnter={() => {
          if(audio) {
            audio.play()
          }
        }}
        onMouseLeave={() => {
          if(audio) {
            audio.pause()
          }
        }}
      >
        <img
          alt={image_alt}
          className="ui image"
          src={image}
        />
        <h1>{data.name}</h1>
        <p>{data.type === 'track' ? data.artists[0].name : null}</p>
      </div>
    </Zoom>
  )
}

export default Bubble;