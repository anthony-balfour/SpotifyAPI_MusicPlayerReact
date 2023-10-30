import React, { useState, useEffect } from 'react'
import apiClient from '../../spotify'
import spotify from '../../assets/spotify.jpg';
import { IconContext } from "react-icons";
import {AiFillPlayCircle } from "react-icons/ai";
import './library.css';

export default function Library() {

  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    apiClient.get("me/playlists")
    .then(response => {
      setPlaylists(response.data.items);
    })
  }, []);
  return (
    <div className='page-container'>
      <main className='library-body'>
        {playlists?.map((playlist) => {

          const image = playlist.images[0] ? playlist.images[0].url : spotify;
          console.log(playlist);
          return <div className="playlist-card">
            <img src={image} className="playlist-image" alt="Playlist Art" />
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
