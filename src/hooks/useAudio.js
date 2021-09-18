import { useState, useEffect } from 'react';

import spotify from '../api/spotify';

const useAudio = (data, token) => {
  const [audio, setAudio] = useState(null) // url to mp3 sample, internal use only
  const [playing, setPlaying] = useState(false) // toggle to play sample, return playing in object and setPlaying
  const [isPlaying, setIsPlaying] = useState(false)

// Artists top tracks throws a 403 error saying the user is not in developer mode, possible bug with API since that data is suppose to be public?
  // const getArtistTopTrack = async () => {
  //   const id = data.id
  //   const response = await spotify.get(`/v1/artists/${id}/top-tracks`, {
  //     headers: {Authorization: 'Bearer ' + token},
  //     params: {market: 'US'}
  //   })
  //   return response.data.tracks[0]
  // }

  // function to get preview url from track endpoint if the preview_url is null from personalization endpoint
  const getPreviewUrlFromTrack = async () => {
    const id = data.id
    const response = await spotify.get(`/v1/tracks/${id}`, {
      headers: {Authorization: 'Bearer ' + token},
      params: {market: 'US'}
    })
    console.log(response);
    return response.preview_url;
  }

  const play = () => {
    if(!isPlaying){
      audio.volume = 0.1;
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
    if(data.type === 'track') {
      if(data.preview_url){
        setAudio(new Audio(data.preview_url));
      } else {
        console.log('Failed to get preview_url from personalization endpoint');
        console.log('Trying to get preview_url from track endpoint');
        getPreviewUrlFromTrack().then(preview_url => {
          if(preview_url){
            setAudio(new Audio(preview_url));
          } else {
            console.log('Failed to get preview_url from track endpoint')
            setAudio(null)
          }
        })
      }
    } else {
      // Disable audio playback for artists, see comment above getArtistsTopTrack for reason
      setAudio(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  useEffect(() => {
    if(audio){
      playing ? play() : stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])


  return [isPlaying, setPlaying];
}

export default useAudio;