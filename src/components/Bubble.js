import React from 'react'
import './Bubble.css'

const Bubble = ({ data }) => {
  const image = data.type === 'artist' ? data.images[1].url : data.album.images[1].url
  const image_alt = data.type === 'artist' ? data.name : data.album.name
  return (
    <div className="bubble" onClick={() => console.log(data.name)}>
      <img
        alt={image_alt}
        className="ui image"
        src={image}
      />
      <h1>{data.name}</h1>
      <p>{data.type === 'track' ? data.artists[0].name : null}</p>
    </div>
  )
}

export default Bubble;