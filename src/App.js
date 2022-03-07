
import React, {useEffect, useState} from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
// import axios from 'axios';
import Home from './component/Home';
import About from './component/About';
import Navbar from './layout/Navbar';
import AddData from './user/AddData';
import EditData from "./user/EditData";

function App() {
  return (
    
    <div className='App'>
        
        {/* <Route  path='/home'><Home /></Route>
        <Route  path='/about'><About /></Route> */}
       <Navbar />
       <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/adddata" element={<AddData />} />
          <Route  exact path="/editdata/:id" element={<EditData />} />
        
      </Routes>
       
       
    </div>

    
      );
}

export default App;
