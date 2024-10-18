import { useState, useEffect } from 'react';
// import axios from 'axios';

import API_URL from '../../apiConfig.js'; 
console.log('API_URL', API_URL);

// import React from 'react';
import AudioRecorder from "../components/recordButton.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import SongSearcher from "../components/songSearcher.js"

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



const Index_loggedin = () => {
  //define states
  const [isRecording, setIsRecording] = useState(false);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const [songsData, setSongsData] = useState<Song[]>([]);
  const [topGenres, setTopGenres] = useState<{ genre: string; count: number }[]>([]);




  useEffect(() => {
    console.log('songsData', songsData);
    console.log('topGenres', topGenres);
  }, [topGenres,songsData]);

  useEffect(() => {
    const firstname = sessionStorage.getItem("user_firstname");
    setFirstname(firstname)
    const surname = sessionStorage.getItem("user_surname");
    setLastname(surname)
    const email = sessionStorage.getItem("user_email");
    setEmail(email)
  }, []);


  const handleRecordingStatus = (status: boolean) => {
    setIsRecording(status);
  };



  return (
    <div className='index-loggedin-wrapper'>
      
      < Header />

      <div className='index-loggedin-box'>
            <h1>Hi {firstname} {lastname}</h1>
            <p>{email}</p>
            {/* <p>This is your shelf, where all your saved songs are stored</p> */}
       </div>


      <div className='info-wrapper d-flex justify-content-around'>

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

export default Index_loggedin;
