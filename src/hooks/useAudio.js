import { useState, useEffect } from 'react';

import spotify from '../api/spotify';

const useAudio = (data, token) => {
  const [song, setSong] = useState('') // return song in object
  const [audio, setAudio] = useState(null) //internal only
  const [playing, setPlaying] = useState(false) // return playing in object and setPlaying

  const getArtistTopTrack = async () => {
    const id = data.id
    const response = await spotify.get(`/v1/artists/${id}/top-tracks`, {
      headers: {Authorization: 'Bearer ' + token},
      params: {market: 'US'}
    })
    return response.data.tracks[0]
  }

  const stop = () => {
    audio.pause();
    audio.currentTime = 0; //Reset the sample
  }

  useEffect(() => {
    if(data.type === 'artist') {
      //TODO: refactor this then keyword with async and await
      getArtistTopTrack().then(track => {
        setSong(track.name)
        setAudio(new Audio(track.preview_url));
      })
    } else {
      setAudio(new Audio(data.preview_url));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  useEffect(() => {
    if(audio){
      playing ? audio.play() : stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])


  return [{song: song, playing: playing}, setPlaying];
}

export default useAudio;