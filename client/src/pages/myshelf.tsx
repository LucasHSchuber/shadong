import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useLocation } from 'react-router-dom';

import API_URL from '../../apiConfig.js'; 
console.log('API_URL', API_URL);

// import images
// import img from "../assets/images/s.png"
// import heroimage from "../assets/images/hero.jpg"

import "../assets/css/recordButton.css"
// import React from 'react';
import AudioRecorder from "../components/recordButton"
import Header from "../components/header"
import Footer from "../components/footer"
import SongSearcher from "../components/songSearcher"


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

      // Fetch songs when component mounts
    useEffect(() => {
        const fetchSongs = async () => {
          const userId = 3;
            try {
                const response = await axios.get(`${API_URL}api/users/${userId}/songs`);
                console.log('response', response);
                if (response.data.length > 0) {
                    setSongsData(response.data);

                    let genreArray: string[] = [];

                    // Your existing code to fill genreArray
                    response.data.forEach((song: Song) => {
                        genreArray.push(...song.genres.split(',').map(genre => genre.trim())); 
                    });
                    
                    // Count occurrences of each genre
                    const genreCount = genreArray.reduce<{ [key: string]: number }>((acc, genre) => {
                        acc[genre] = (acc[genre] || 0) + 1;
                        return acc;
                    }, {});
                    
                    // Convert genreCount object to an array of objects
                    const topGenresArray = Object.entries(genreCount).map(([genre, count]) => ({
                        genre,
                        count,
                    }));
                    console.log('topGenresArray', topGenresArray);

                    const topGenres = topGenresArray.filter(g => g.genre !== "Music")
                    console.log('topGenres', topGenres);

                    setTopGenres(topGenres);
                    
                }
            } catch (err) {
                console.log('err', err);
            }
        };
        fetchSongs();
    }, [API_URL]);


  
    const handleRecordingStatus = (status: boolean) => {
        setIsRecording(status);
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
            <h1 className='title'>My Songs</h1>
                <div className='myshelf-songs-container'>
                    {songsData && songsData.map(song => (
                        <div className='myshelf-songs' key={song.spotify_id}>
    <                       img src={song.image_url} alt={`Song Id ${song.song_id}`} className='album-img'  title="Open In Spotify"></img>
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
                <div className='d-flex'>
                    {topGenres && topGenres.slice(0,5).map(genre => (
                        <div className='myshelf-genre' key={genre.genre}>
                           <h1>{genre.genre}</h1>
                        </div>
                    ))}
                </div>
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

export default Myshelf;
