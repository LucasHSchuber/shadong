import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// import keys from "../../../client/env.js";
const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const spotifyClientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

import API_URL from '../../apiConfig.js'; 

// import images
import img from "../assets/images/s.png"
import spotify from "../assets/images/spotify.png"
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
    uri: string,
};


const Songresult = () => {
    // const [songResults, setSongResults] = useState([]);
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
            const authString = `${spotifyClientId}:${spotifyClientSecret}`;
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


    // Fetch songs based on artistID
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

    const playSong = (uri: string) => {
        console.log('playing song', uri);
        window.open(uri, '_blank');
    }


    const addToShelf = async () => {
        console.log('Adding song to shelf...');
    
        const songData = {
            spotifyId: songResult.spotify.id,
            userId: 3, 
            title: songResult.title,
            artist: songResult.artist,
            genres: songResult.apple_music.genreNames,
            image_url: songResult.spotify.album.images[0].url,
            spotify_uri: songResult.spotify.uri,
        };
        console.log('songData', songData);
    
        try {
            const response = await axios.post(`${API_URL}api/songs/add`, songData);
            console.log('Song added:', response.data);
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };
    
  
  return (
    <div className='songresult-wrapper'>
      
      < Header />

      <div className='songresult-box d-flex'>
            <div className='songresult-left-box'>
                <img src={songResult.spotify ? songResult.spotify.album.images[1].url : img} alt="Album Cover" style={{ width: '300px', height: 'auto' }} />
            </div>
            <div className='songresult-right-box'>
                <div className='d-flex'>
                    <h1>{songResult.title}</h1>
                    <img src={spotify} alt={"Spotify Logo"} title="Open In Spotify" className='ml-3 mt-2' width={30} height={30} onClick={() => playSong(songResult.spotify.uri)}></img>
                </div>
                <h3>{songResult.artist}</h3>
                <div className='mt-4'>
                    <h6>Genre: {songResult.apple_music.genreNames.length > 0 ? songResult.apple_music.genreNames.join(', ') : songResult.apple_music.genreNames[0]}</h6>
                    <h6>Album: {songResult.album ? songResult.album : "NaN"}</h6>
                    <h6>Release Date: {songResult.release_date}</h6>
                </div>
                <button className='mt-3 button add-song-button' onClick={() => addToShelf()}>Add Song To Shelf</button>
            </div>
      </div>

      <div className='songresult-music-box'>
        <h1 className='title'>Songs by {artistName} </h1>
            <div className='songresult-songs-container'>
                {songsByArtist && songsByArtist.map(song => (
                    <div className='songresult-songsbyartist' key={song.id}>

                        <img src={spotify} alt={song.id + "Spotify Logo"} className='spotify-icon' title="Open In Spotify" onClick={() => playSong(song.uri)}></img>
                    
                        <img src={song.images.length > 0 ? song.images[0].url : img} alt={`Song Id ${song.id}`} className='album-img' onClick={() => playSong(song.uri)} title="Open In Spotify"></img>
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
