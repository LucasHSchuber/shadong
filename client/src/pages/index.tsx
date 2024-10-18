import { useState } from 'react';
// import axios from 'axios';

// import images
import heroimage from "../assets/images/heroimg.jpg"

// import React from 'react';
import AudioRecorder from "../components/recordButton"
import Header from "../components/header"
import Footer from "../components/footer"
import SongSearcher from "../components/songSearcher"

import API_URL from '../../apiConfig.js'; 
console.log('API_URL', API_URL);



const Index = () => {
  const [isRecording, setIsRecording] = useState(false);


  const handleRecordingStatus = (status: boolean) => {
    setIsRecording(status);
  };

  return (
    <div className='index-wrapper'>
      
      < Header />

      <div className='hero-wrapper d-flex justify-content-around'>
        <div className='left-hero-box'>
            <img className="hero-img" src={heroimage} alt="Hero Image"></img>
        </div>
        <div className='right-hero-box'>
            {/* <h1>Find the song with Shadong</h1> */}
            <h1>Just <span>Shadong</span> It!</h1>
            <p>It’s simple. Just press the record button and find the song from the radio or your computer speaker. Once the song is found, add it to your Shadong Shelf and play it whenever you want </p>
            <p style={{ fontWeight: "900", fontSize: "1.8em", textDecoration: "underline", marginTop: "2em" }}>100% FREE!</p>
        </div>
      </div>

      <div className='info-wrapper d-flex justify-content-around'>
        {/* <div className=''>
            <h1>Just Shadong It!</h1>
        </div>
        <div className=''>
           
        </div> */}
      </div>

      <div className='content-wrapper-1'>
        <h1>Create an account</h1>
      </div>
      
      <div className='content-wrapper-2'>
        <h1>Find a song by recording a snippet of the music</h1>
      </div>

      <div className='content-wrapper-3'>
        <h1>Save it to your Shadong shelf </h1>
      </div>

      <div className='content-wrapper-4'>
        <h1>Play the song from your shelf anytime</h1>
      </div>
      <div className='content-wrapper-5'>
        <h1>Shadong</h1>
      </div>


      < AudioRecorder onRecordingStatusChange={handleRecordingStatus} />
      {isRecording && 
        < SongSearcher />
      }
      < Footer />
    </div>
  ) 
};

export default Index;
