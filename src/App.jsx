import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './styles/App.css';
import UserDataGet from './UserDataGet';
import { useNavigate } from 'react-router-dom';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  // Do wylogowania
  const handleLogout = () => {
    setLogout(true);
  };

  const onChange = (date) => {
    setDate(date);
  };

  // Do przekierowania bez warningów
  useEffect(() => {
    if (logout) {
      navigate('/');
    }
  }, [logout, navigate]);

  // Przekierowanie z warningiem
  // if (logout) {
  //   navigate('/');
  // }

  return (
    // Aktualna zawartość
    <div className="container">   
      <div className="calendar">
        <h1>Kalendarz</h1>
        <Calendar
          onChange={onChange}
          value={date}
          className="react-calendar custom-calendar" // Klasa do stylizacji kalendarza
          formatShortWeekday={(locale, date) =>
            new Intl.DateTimeFormat('pl', { weekday: 'long' }).format(date) // Format na pełne nazwy dni tygodnia
          }
        />
      </div>
      <div className="second-div">
        <div onClick={handleLogout}>Wyloguj</div>
        <h3>Przestrzeń na wydarzenia użytkownika </h3>
        <UserDataGet />
      </div>
    </div>
  );
};

export default MyCalendar;
