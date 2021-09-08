import { useState, useEffect } from 'react';

import spotify from '../api/spotify';

const useAudio = (data, token) => {
  const [song, setSong] = useState('')
  const [audio, setAudio] = useState(null) //internal only
  const [playing, setPlaying] = useState(false) // return playing and setPlaying

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
    audio.currentTime = 0;
  }

  useEffect(() => {
    if(data.type === 'artist') {
      getArtistTopTrack().then(track => {
        setSong(track.name)
        setAudio(new Audio(track.preview_url));
      })
    } else {
      setAudio(new Audio(data.preview_url));
    }
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