import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import MyCalendar from './components/myCalendar/MyCalendar';
import LoginSignup from './components/loginSignup/LoginSingup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/calendar' element={<MyCalendar />} />
      </Routes>  
    </Router>
  </React.StrictMode>
);
