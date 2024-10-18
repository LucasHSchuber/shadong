import { useState, useEffect } from 'react';
import axios from 'axios';

import API_URL from '../../apiConfig.js'; 
console.log('API_URL', API_URL);

// import keys from "../../../client/env.js";
const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const spotifyClientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// import images
import spotify from "../assets/images/spotify.png"

import "../assets/css/recordButton.css"
// import React from 'react';
import AudioRecorder from "../components/recordButton"
import Header from "../components/header"
import Footer from "../components/footer"
import SongSearcher from "../components/songSearcher"

import FetchSongs from "../assets/tsx/fetchSongs.js";


type Song = {
    song_id: string;
    spotify_id: string;
    name: string;
    genres: string;
    title: string;
    artist: string,
    image_url: string,
    spotify_uri: string
}

const Myshelf: React.FC = () => {
    //define states
    const [isRecording, setIsRecording] = useState(false);
    const [songsData, setSongsData] = useState<Song[]>([]);
    const [topGenres, setTopGenres] = useState<{ genre: string; count: number }[]>([]);
    const [accessToken, setAccessToken] = useState('');
  
    const handleRecordingStatus = (status: boolean) => {
        setIsRecording(status);
    };


    const playSong = (uri: string) => {
        console.log('playing song', uri);
        window.open(uri, '_blank');
    }


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
            console.log('data token', data);
            setAccessToken(data.access_token); 
        };

        getAccessToken();
    }, []);
    
    const getRecommendations = async (genre: string) => {
        console.log('genre', genre);      
        try {
          const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genre.toLowerCase()}&limit=10`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
           
          });
      
          const data = await response.json();
          console.log('data recommendations', data);
          
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }

        try {
          const response = await fetch(`https://api.spotify.com/v1/search?q=genre:${genre}&type=album&limit=10`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
           
          });
      
          const data = await response.json();
          console.log('data albums', data);
          
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
    };




  
  return (
    <div className='myshelf-wrapper'>
      
      < Header />

      <div className='myshelf-box'>
            <h1>My Shelf</h1>
            <p>This is your shelf, where all your saved songs are stored</p>
       </div>
       
       
       <div className='myshelf-music-box'> 
        <div className='my-5'>
            <h1 className='title'>Most Recent Songs</h1>
                <div className='myshelf-songs-container'>
                    {songsData && songsData.slice(0, 6).map(song => (
                        <div className='myshelf-songs' key={song.spotify_id}>
                            <div onClick={() => playSong(song.spotify_uri)}>
                                <img src={spotify} alt={song.spotify_id + "Spotify Logo"} className='myshelf-spotify-icon' title="Open In Spotify" ></img>
                                <img src={song.image_url} alt={`Song Id ${song.song_id}`} className='album-img'  title="Open In Spotify" ></img>
                            </div>
                            <h1>{song.title}</h1>
                            <h2>{song.artist}</h2>
                            <h2>
                                Genre: {song.genres.split(",").map(genre => genre.trim()).join(", ")}
                            </h2>
                        </div>
                    ))}
                </div>
           </div>  


           <div className='my-5'>
                <h1 className='title'>Explore Favorite Genres</h1>
                <div className='d-flex myshelf-genre-container'>
                    {topGenres && topGenres.slice(0, 4).map(genre => (
                        <div className='myshelf-genre' key={genre.genre} onClick={() => getRecommendations(genre.genre)}>
                           <h1>{genre.genre}</h1>
                        </div>
                    ))}
                </div>
            </div>      


            <div className='my-5'>
            <h1 className='title'>All Songs</h1>
                <div className='myshelf-songs-container'>
                    {songsData && songsData.map(song => (
                        <div className='myshelf-songs' key={song.spotify_id}>
                            <div onClick={() => playSong(song.spotify_uri)}>
                                <img src={spotify} alt={song.spotify_id + "Spotify Logo"} className='myshelf-spotify-icon' title="Open In Spotify" ></img>
                                <img src={song.image_url} alt={`Song Id ${song.song_id}`} className='album-img'  title="Open In Spotify" ></img>
                            </div>
                            <h1>{song.title}</h1>
                            <h2>{song.artist}</h2>
                            <h2>
                                Genre: {song.genres.split(",").map(genre => genre.trim()).join(", ")}
                            </h2>
                        </div>
                    ))}
                </div>
           </div>     


      </div>

      <FetchSongs setSongsData={setSongsData} setTopGenres={setTopGenres} />
     
      < AudioRecorder onRecordingStatusChange={handleRecordingStatus} />
      {isRecording && 
        < SongSearcher />
      }
      < Footer />
    </div>
  ) 
};

export default Myshelf;
