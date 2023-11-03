import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import MyCalendar from './components/myCalendar/MyCalendar';
import LoginSignup from './components/loginSignup/LoginSingup';
import Diary from './components/myCalendar/Diary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/calendar' element={<MyCalendar />} />
        <Route path='/diary' element={<Diary />} />
      </Routes>  
    </Router>
  </React.StrictMode>
);
