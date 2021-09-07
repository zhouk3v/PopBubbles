import React, { useRef }from 'react'
import useOnScreen from './useIntersection'

import './css/Bubble.css'


const Bubble = ({ data }) => {
  const image = data.type === 'artist' ? data.images[1].url : data.album.images[1].url
  const image_alt = data.type === 'artist' ? data.name : data.album.name
  const ref = useRef();
  const isVisible = useOnScreen(ref)

  if(isVisible) {
    console.log(`${data.name} is in viewport`)
  }

  return (
    <div className="bubble" onClick={() => console.log(data.name)}>
      <img
        alt={image_alt}
        className="ui image"
        src={image}
      />
      <h1 ref={ref}>{data.name}</h1>
      <p>{data.type === 'track' ? data.artists[0].name : null}</p>
    </div>
  )
}

export default Bubble;