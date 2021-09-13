import { useState, useEffect } from 'react';

import spotify from '../api/spotify';

const useAudio = (data, token) => {
  const [song, setSong] = useState('') // song title to display on screen, return song in object
  const [audio, setAudio] = useState(null) // url to mp3 sample, internal use only
  const [playing, setPlaying] = useState(false) // toggle to play sample, return playing in object and setPlaying
  const [isPlaying, setIsPlaying] = useState(false)

  const getArtistTopTrack = async () => {
    const id = data.id
    const response = await spotify.get(`/v1/artists/${id}/top-tracks`, {
      headers: {Authorization: 'Bearer ' + token},
      params: {market: 'US'}
    })
    return response.data.tracks[0]
  }

  const play = () => {
    if(!isPlaying){
      var playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log(error)
          setIsPlaying(false)
        });
      }
    }
  }

  const stop = () => {
    if(isPlaying) {
      audio.pause();
      audio.currentTime = 0; //Reset the sample
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if(data.type === 'artist') {
      //TODO: refactor this then keyword with async and await
      getArtistTopTrack().then(track => {
        setSong(track.name)
        setAudio(new Audio(track.preview_url));
      })
    } else {
      if(data.preview_url){
        setAudio(new Audio(data.preview_url));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  useEffect(() => {
    if(audio){
      playing ? play() : stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])


  return [{song: song, playing: playing}, setPlaying];
}

export default useAudio;