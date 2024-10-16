import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
// import keys
import keys from "../../../client/env.js";
// console.log('keys', keys);


// import css
import "../assets/css/recordButton.css"


interface AudioRecorderProps {
    onRecordingStatusChange: (isRecording: boolean) => void;
  }

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingStatusChange }) => {
    // const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const navigate = useNavigate(); 
    
    const startRecording = async () => {
        console.log("Start recording....")
        // setIsRecording(true);
        onRecordingStatusChange(true);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                sampleRate: 44100, 
                channelCount: 2,   
                echoCancellation: false,
                noiseSuppression: false
            }
        });
    
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        
        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };
    
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            recognizeSong(audioBlob); 
        };
    
        mediaRecorderRef.current.start();

        // Automatically stop recording after 7 seconds
        setTimeout(() => {
                stopRecording();
        }, 7000);
    };
    
    const stopRecording = () => {
        // setIsRecording(false);
        mediaRecorderRef.current?.stop();
    };

    const recognizeSong = async (audioBlob: Blob) => {
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav'); 

        try {
            const response = await axios.post('https://api.audd.io/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    api_token: keys.API_KEY,
                    // api_token: "123", 
                    return: 'apple_music,spotify',
                }
            });
            console.log('Recognition Result:', response.data);
            if (response.data.status === "success" && response.data.result !== null) {
                onRecordingStatusChange(false);
                // setIsRecording(false);
                console.log("Found The Song!")
                navigate('/songresult', { state: { songResult: response.data.result } }); 
                
            } else {
                console.log("Could Not Find The Song! :(, Trying Again!")   
                startRecording()
            }
            
        } catch (error) {
            console.error('Error recognizing song:', error);
        }
    };

    return (
        <div className='record-button'>
            <button title='Shadong The Song' onClick={startRecording}>
               S
            </button>
        </div>
    );
};

export default AudioRecorder;
