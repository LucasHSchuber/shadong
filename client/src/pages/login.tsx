import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

import { useAuth } from '../components/authContext';

import API_URL from '../../apiConfig.js'; 
console.log('API_URL', API_URL);

// import images
// import img from "../assets/images/s.png"
// import heroimage from "../assets/images/hero.jpg"

import "../assets/css/recordButton.css"
// import React from 'react';
// import AudioRecorder from "../components/recordButton"
import Header from "../components/header"
import Footer from "../components/footer"
// import SongSearcher from "../components/songSearcher"


interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    //define states
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Handle form submission, e.g., send formData to your backend
        console.log('Form submitted:', formData);
        try {
            const response = await axios.post(`${API_URL}api/users/login`, formData )
            console.log('response', response);
            if (response.status === 200) {
                const token = response.data.token;
                console.log('token', token);
                // sessionStorage.setItem("user_token", token);
                sessionStorage.setItem("user_id", response.data.id);
                sessionStorage.setItem("user_email", response.data.email);
                sessionStorage.setItem("user_firstname", response.data.firstname);
                sessionStorage.setItem("user_surname", response.data.surname);
                login(token);
                navigate("/");
            }
        } catch (error) {
            console.log('error when logging in user: ', error);
        }
    };




  
  return (
    <div className='register-wrapper'>
      
      < Header />

      <div className='register-box'>
            <h2 className='mb-3'>Log In</h2>
            <hr></hr>
            <form onSubmit={handleSubmit}>       
                <div>
                    <div>
                    <label htmlFor='email'>Email:</label>
                    </div>
                    <div>
                    <input
                        className='register-form-input'
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                <div>
                    <div>
                    <label htmlFor='password'>Password:</label>
                    </div>
                    <div>
                    <input
                        className='register-form-input'
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                
                <button className='mt-5 button register-button' type='submit'>Log In</button>
            </form>
        </div>
     
      < Footer />
    </div>
  ) 
};

export default Login;
