import { useRef, useState } from 'react';
import axios from 'axios';

// import keys
import keys from "../../../client/env.js";
// console.log('keys', keys);


// import css
import "../assets/css/songSearcher.css"

const SongSearcher = () => {
    const [message1, setMessage1] = useState<String>("");
    const [message2, setMessage2] = useState<String>("");

    setTimeout(() => {
        setMessage1("Almost got it...")
    }, 5000);

    setTimeout(() => {
        setMessage2("This is a tough one...")
    }, 10000);

    return (
        <div className='searching-for-song-wrapper'>
             <div className='spinning-record'>
                <button>
                S
                </button>
             </div>
            <h1>Hang on!</h1>
            <h2>{message2 ? message2 : message1 ? message1 : "We are searching for the song..."}</h2>
        </div>
    );
};

export default SongSearcher;
