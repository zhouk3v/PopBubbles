import React from 'react'

const Bubble = ({ data }) => {
  const image = data.type === 'artist' ? data.images[2].url : data.album.images[1].url
  const image_alt = data.type === 'artist' ? data.name : data.album.name
  console.log(data)
  return (
    <div>
      <img
        alt={image_alt}
        className="ui image"
        src={image}
      />
      <h2>{data.name}</h2>
      <h3>{data.type === 'track' ? data.artists[0].name : null}</h3>
    </div>
  )
}

export default Bubble;