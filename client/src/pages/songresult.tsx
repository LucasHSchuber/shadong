import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import keys from "../../../client/env.js";

// import images
import img from "../assets/images/s.png"
// import heroimage from "../assets/images/hero.jpg"

import "../assets/css/recordButton.css"
// import React from 'react';
import AudioRecorder from "../components/recordButton"
import Header from "../components/header"
import Footer from "../components/footer"
import SongSearcher from "../components/songSearcher"


type Song = {
    id: string;
    name: string;
    release_date: string;
    images: { url: string }[];
};


const Songresult = () => {
    const [songResults, setSongResults] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [songsByArtist, setSongsByArtist] = useState<Song[]>([]);
    // const [artistName, setArtistName] = useState<String>("");

    const location = useLocation(); 
    const songResult = location.state?.songResult
    const artistID = location.state?.songResult.spotify.artists[0].id
    const artistName = location.state?.songResult.spotify.artists[0].name




    // Get Access Token
    useEffect(() => {
        const getAccessToken = async () => {
            const authString = `${keys.SPOTIFY_CLIENT_ID}:${keys.SPOTIFY_CLIENT_SECRET}`;
            const base64Auth = btoa(authString); 

            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${base64Auth}`,
                },
                body: 'grant_type=client_credentials',
            });

            const data = await response.json();
            // console.log('data token', data);
            setAccessToken(data.access_token); 
        };

        getAccessToken();
    }, [artistID]);


    // Fetch Ellen Krauss's songs once we have the access token
    useEffect(() => {
        const fetchSongs = async () => {
            if (!accessToken) return; 

            const response = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();
            console.log('data songs', data);
            setSongsByArtist(data.items); 
        };

        fetchSongs();
    }, [accessToken]);



    const handleRecordingStatus = (status: boolean) => {
      setIsRecording(status);
    };

  
  return (
    <div className='songresult-wrapper'>
      
      < Header />

      <div className='songresult-box d-flex'>
            <div className='songresult-left-box'>
                <img src={songResult.spotify ? songResult.spotify.album.images[1].url : img} alt="Album Cover" style={{ width: '300px', height: 'auto' }} />
            </div>
            <div className='songresult-right-box'>
                <h1>{songResult.title}</h1>
                <h3>{songResult.artist}</h3>
                <div className='mt-4'>
                    <h6>Genre: {songResult.apple_music.genreNames > 0 ? songResult.apple_music.genreNames.join(', ') : songResult.apple_music.genreNames[0]}</h6>
                    <h6>Album: {songResult.album ? songResult.album : "NaN"}</h6>
                    <h6>Release Date: {songResult.release_date}</h6>
                </div>
                <button className='mt-3 button add-song-button'>Add Song To Shelf</button>
            </div>
      </div>

      <div className='songresult-music-box'>
        <h1 className='title'>Songs by {artistName} </h1>
            <div className='songresult-songs-container'>
                {songsByArtist && songsByArtist.map(song => (
                    <div className='songresult-songsbyartist' key={song.id}>
                        <img src={song.images.length > 0 ? song.images[0].url : img} alt={`Song Id ${song.id}`}></img>
                        <h1>{song.name}</h1>
                        <h2>Released: {song.release_date}</h2>
                    </div>
                ))}
            </div>
      </div>

     

      < AudioRecorder onRecordingStatusChange={handleRecordingStatus} />
      {isRecording && 
        < SongSearcher />
      }
      < Footer />
    </div>
  ) 
};

export default Songresult;
