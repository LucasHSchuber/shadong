// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import "../src/assets/css/main.css"
import "../src/assets/css/buttons.css"
// import "../src/css/components.css"
// import "../src/css/buttons.css"



import { HashRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; 

import Index from "./pages/index"
import Songresult from "./pages/songresult";

function App() {

  return (
    <HashRouter>
      <AnimatePresence >
        {/* <Layout> */}
        {/* < Header /> */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/songresult" element={<Songresult />} />
            {/* <Route 
            path="/songresult" 
            element={
              <motion.div
                initial={{ opacity: 0 }} // Starting state for entering animation
                animate={{ opacity: 1 }} // Ending state for entering animation
                exit={{ opacity: 0 }} // Ending state for exiting animation
                transition={{ duration: 1 }} // Duration of the transition
              >
                <Songresult />
              </motion.div>
            } 
          /> */}
            {/* <Route path="/myshelf" element={<Index />} />'
            <Route path="/about" element={<Index />} />'
            '<Route path="/logout" element={<Index />} />' */}
          </Routes>
        {/* </Layout> */}
      </AnimatePresence>
    </HashRouter>
  )
}

export default App
