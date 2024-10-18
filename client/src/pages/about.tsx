import { useState } from 'react';

import AudioRecorder from "../components/recordButton"
import Header from "../components/header"
import Footer from "../components/footer"
import SongSearcher from "../components/songSearcher"

const About: React.FC = () => {
    //define states = () => {
    const [isRecording, setIsRecording] = useState(false);
     

    const handleRecordingStatus = (status: boolean) => {
        setIsRecording(status);
    };

  return (
    <div className="about-wrapper">

        < Header />

    <div className='about-box'>
      <h1>About Shadong</h1>
      <p><strong>Shadong</strong> is a unique and innovative music discovery platform designed to enhance your listening experience by helping you uncover new music tailored to your personal tastes. Whether you're a casual listener or an avid music enthusiast, Shadong connects you to a world of songs, artists, and genres that you might not have explored yet.</p>
    </div> 

    <div className='about-box'>
      <h2>How Shadong Works</h2>
      <p>At its core, Shadong leverages the vast library of music available on Spotify to curate playlists and recommend tracks based on your favorite genres, artists, or songs. The platform allows users to:</p>
      <ul>
        <li><strong>Discover New Music</strong>: Shadong provides personalized music recommendations based on what you like. Simply connect your Spotify account, and Shadong will analyze your favorite tracks and introduce you to fresh, exciting music.</li>
        <li><strong>Save and Share</strong>: Keep track of the songs you discover by saving them to your shelf, and easily share your new discoveries with friends or on social media.</li>
        <li><strong>Explore New Artists</strong>: Learn more about up-and-coming artists or rediscover established ones. Shadong gives you deeper insights into their work, style, and influence.</li>
      </ul>
    </div>

    <div className='about-box'>
      <h2>Features</h2>
      <ul>
        <li><strong>Personalized Playlists</strong>: Create playlists based on your mood, favorite artists, or genres.</li>
        <li><strong>Music Exploration</strong>: Find new songs and artists similar to your existing music preferences.</li>
        <li><strong>User-Friendly Interface</strong>: Simple and clean design to help you navigate through the platform effortlessly.</li>
        <li><strong>Sync with Spotify</strong>: Seamlessly integrate your Spotify account for easy access to your playlists and liked songs.</li>
      </ul>
      </div>

    <div className='about-box'>
      <h2>Why Shadong?</h2>
      <p>The idea behind Shadong was born out of a love for music and a desire to make music discovery more intuitive and engaging. With an overwhelming amount of music available on streaming platforms, it can be difficult to find the right tracks that truly resonate with you. Shadong solves this problem by creating a tailored, enjoyable journey through music discovery.</p>
    </div>

      <div className='about-box'>
      <h2>The Future of Shadong</h2>
      <p>We are constantly working on expanding Shadong's capabilities to make your experience even more enriching. Our roadmap includes features such as advanced search tools, collaborative playlists, and deeper integration with other music services.</p>
    </div>

    <div className='about-box mb-5'>
      <p>At Shadong, we believe that music is more than just sound—it's an emotional experience, a cultural expression, and a source of endless inspiration. Our goal is to make music discovery an exciting and personal journey for everyone.</p>
      <p>Join Shadong today and dive into a world of endless musical possibilities!</p>
    </div>

      < AudioRecorder onRecordingStatusChange={handleRecordingStatus} />
      {isRecording && 
        < SongSearcher />
      }
      < Footer />

    </div>
  );
};

export default About;
