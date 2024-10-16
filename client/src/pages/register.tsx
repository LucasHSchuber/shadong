import { useState } from 'react';
import axios from 'axios';
// import { useLocation } from 'react-router-dom';

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
    firstname: string;
    surname: string;
    email: string;
    password: string;
    repeatpassword: string
}

const Register: React.FC = () => {
    //define states
    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        surname: '',
        email: '',
        password: '',
        repeatpassword: ''

    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formCheck = checkFormPassword(formData);
        if (formCheck) {return;}
        // Handle form submission, e.g., send formData to your backend
        console.log('Form submitted:', formData);
        try {
            const response = await axios.post(`${API_URL}api/users/register`, formData )
            console.log('response', response.data);
        } catch (error) {
            console.log('error when adding user to users table: ', error);
        }
    };


    const checkFormPassword = (formData: FormData) => {
        
        let check = false;
        if (formData.password.toLocaleLowerCase() !== formData.repeatpassword.toLocaleLowerCase()) {
            check = true;
            console.log("Passwords does not match");
        }
        return check;
    }




  
  return (
    <div className='register-wrapper'>
      
      < Header />

      <div className='register-box'>
            <h2 className='mb-3'>Register</h2>
            <p>It's 100% free to register and use Shadong. Don't worry about later fees, because there are none!</p>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                    <label htmlFor='firstname'>First Name:</label>
                    </div>
                    <div>
                    <input
                        className='register-form-input'
                        type='text'
                        id='firstname'
                        name='firstname'
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                <div>
                    <div>
                    <label htmlFor='surname'>Last Name:</label>
                    </div>
                    <div>
                    <input
                        className='register-form-input'
                        type='text'
                        id='surname'
                        name='surname'
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
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
                <div>
                    <div>
                    <label htmlFor='repeatpassword'>Password:</label>
                    </div>
                    <div>
                    <input
                        className='register-form-input'
                        type='password'
                        id='repeatpassword'
                        name='repeatpassword'
                        value={formData.repeatpassword}
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                <button className='mt-5 button register-button' type='submit'>Register</button>
            </form>
        </div>
     
      < Footer />
    </div>
  ) 
};

export default Register;
