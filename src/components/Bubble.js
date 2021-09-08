import React, {useState, useEffect} from 'react'
import { Zoom } from 'react-awesome-reveal'

import './css/Bubble.css'


const Bubble = ({ data }) => {
  // image data
  const image = data.type === 'artist' ? data.images[1].url : data.album.images[1].url
  const image_alt = data.type === 'artist' ? data.name : data.album.name

  //audio player stuff
  const [audio, setAudio] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if(data.type === 'artist'){
    } else {
      setAudio(new Audio(data.preview_url));
    }
  }, [])

  useEffect(() => {
    if(data.type === 'track' && audio){
      playing ? audio.play() : audio.pause()
    }
  }, [playing])

  return (
    <Zoom direction="bottom">
      <div 
        className="bubble" 
        onMouseEnter={() => {
          setPlaying(true)
        }}
        onMouseLeave={() => {
          setPlaying(false)
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