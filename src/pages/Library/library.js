// Lists all of the playlists in the user's Spotify Library
// Initially is a login page for Spotify to grab user access token
// if the user access token expires (after over an hour or so), whenever the page
// is reloaded or changed, the page will redirect to the spotify login

import React, { useState, useEffect } from 'react'
import apiClient from '../../spotify'
import spotify from '../../assets/spotify.jpg';
// can use for styling react icons
import { IconContext } from "react-icons";
import {AiFillPlayCircle } from "react-icons/ai";
import './library.css';

import {useNavigate} from 'react-router-dom';

export default function Library() {

  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    apiClient.get("me/playlists")
    .then(response => {
      setPlaylists(response.data.items);
    })
    .catch(() => {
      // reloads the page if the token has run out
      window.localStorage.removeItem("access-token");
      window.location.reload();
    })
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate('/player', {state: {id: id}});
  }
  
  return (
    <div className='page-container'>
      <main className='library-body'>

        {playlists?.map((playlist) => {
          const image = playlist.images.length > 0 ? playlist.images[0].url : spotify;

          return <div className="playlist-card" key={playlist.id} onClick={() => playPlaylist(playlist.id)}>
            <img src={image}
            className="playlist-image" alt="Playlist Art" />
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
            <div className="playlist-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72"}}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        })}

      </main>
    </div>
  )
}
