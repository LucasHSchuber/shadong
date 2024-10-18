// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import "../src/assets/css/main.css"
import "../src/assets/css/buttons.css"
import "../src/assets/css/toastStyles.css"
// import "../src/css/components.css"
// import "../src/css/buttons.css"

import ProtectedRoute from "./components/protectedRoute";
import { useAuth } from './components/authContext';



import { HashRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; 

import Index from "./pages/index"
import Index_loggedin from "./pages/index_loggedin"
import Songresult from "./pages/songresult";
import Register from "./pages/register";
import Login from "./pages/login";
import Myshelf from "./pages/myshelf";
import About from "./pages/about";



function App() {
  //define states
  const { isLoggedIn } = useAuth();

  return (
    <HashRouter>
      <AnimatePresence >
        {/* <Layout> */}
        {/* < Header /> */}
          <Routes>
            
            <Route path="/" element={
                isLoggedIn ? (
                  < ProtectedRoute >
                     <Index_loggedin />
                  </ProtectedRoute>
                ) : (
                 <Index />
                )
              } 
            />

            <Route path="/songresult" element={<Songresult />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/myshelf" element={
              < ProtectedRoute >
                  <Myshelf />
              </ProtectedRoute>
              } 
            />
            

          </Routes>
        {/* </Layout> */}
      </AnimatePresence>
    </HashRouter>
  )
}

export default App
