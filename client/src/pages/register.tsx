import { useState } from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';

// import { useLocation } from 'react-router-dom';
//toaster
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS
import { Slide } from 'react-toastify';


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
    // repeatpassword: string
}

const Register: React.FC = () => {
    //define states
    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        surname: '',
        email: '',
        password: ''
    });
    const [repeatPassword, setRepeatPassword] = useState<string>("");

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
            console.log('response', response);
            if (response.status === 201) {
                console.log('Created!');
                toast.success("Account registerd successfully!");
            } 
        } catch (error: unknown) {
            // Type assertion to handle error as AxiosError
            const axiosError = error as AxiosError;
            console.log('error when adding user to users table: ', axiosError);
            if (axiosError.response && axiosError.response.status === 409) {
                console.log('Email already exists!!');
                toast.success("Email already exists");
            } else {
                // Handle other types of errors (optional)
                console.error('An error occurred:', axiosError.message);
                toast.error("An error occurred. Please try again.");
            }
        }
    };


    const checkFormPassword = (formData: FormData) => {
        
        let check = false;
        if (formData.password.toLocaleLowerCase() !== repeatPassword.toLocaleLowerCase()) {
            check = true;
            console.log("Passwords does not match");
        }
        return check;
    }




  
  return (
    <div className='register-wrapper'>
      
      < Header />

      <div className='register-box'>
            <h2 className='mb-3'>Create Account</h2>
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
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                    </div>
                </div>
                <button className='mt-5 button register-button' type='submit'>Register</button>
            </form>
        </div>
     
      < Footer />

      < ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        transition={Slide}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ fontSize: '15px', height: "3em", width: "22em", margin: "0 0 4em 2em" }}
      />

    </div>
  ) 
};

export default Register;
