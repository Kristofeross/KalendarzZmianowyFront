import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css'; 
import '../../styles/MyCalendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [logout, setLogout] = useState(false);
  const [selectedDate, setSelectedDate] = useState("")
  const [amounEvent] = useState(0);
  const navigate = useNavigate();

  // Do Cruda
  const [isAdd] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState('work');
  const [hours, setHours] = useState(null);



  // Do wylogowania
  const handleLogout = () => {
    setLogout(true);
  };

  // Do zmiany daty
  const onChange = (date) => {
    setDate(date);

    // Wybrana data na inną sytuację
    // const day = date.getDate();
    // const month = date.toLocaleString('default', { month: 'long' });
    // const year = date.getFullYear();
    // const dateInfo = {
    //   day: day,
    //   month: month,
    //   year: year
    // }
    // setSelectedDate(dateInfo);

    // Na wysłanie danych
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);

  };

  // Przekierowanie jeśli nie jesteś zalogowany
  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  // Do przekierowania bez warningów
  useEffect(() => {
    if (logout) {
      sessionStorage.removeItem('token');
      navigate('/');
    }
  }, [logout, navigate]);
  

  const tokens = sessionStorage.getItem('token');
  // Podreczne do styli
  const styles = {cursor: 'pointer',border: '1px solid #000',padding: '5px',margin: '2px 0'};
  const buttonsStyle = {display: 'flex'} 

  // Do obsługi wydarzeń

  const handleAddEvent = () => {
    const data = {
      date: date,
      entry_type: selectedEvent,
      work_hours: parseFloat(hours)
    }
    console.log(data)
    axios.post('http://127.0.0.1:5000/api/calendar/add', data, {
      headers: {
        "Authorization": tokens
      }
  })
    .then(response => {
      console.log('Sukces', response);

    })
    .catch(error => {
      console.error('Błąd', error);
    });

  }

  const handleUpdateEvent = () => {
    console.log("Aktualizowanie")
    console.log(date)
    console.log(typeof date)
  }

  const handleDeleteEvent = () => {
    console.log("Usuwanie")
  }

  const handleChangeSelect = e =>{
    // console.log(e.target.value);
    const selectedValue = e.target.value;
    setSelectedEvent(selectedValue);
    if (selectedValue === 'vacation') {
      setHours(null);
    }
  }

  const handleHoursChange = e => {
    // console.log(e.target.value);
    setHours(e.target.value)
  }

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
      
        {/* Górna część pojemnika - Nagłówki */}
        <div style={styles} onClick={handleLogout}>Wyloguj</div>
        <div className='upBarEventSpace'>
          <div className='calendarDate'>{selectedDate}</div>
          <div className='amountEvents'>Liczba wydarzeń tego dnia wynosi {amounEvent}</div>
        </div>
        {/* Dolna część pojemnika - wydarzenia */}
        <div>

          {isAdd
            ?(
              <React.Fragment>
              <div>Dodawanie wydarzenia</div>
              <div>
                <select value={selectedEvent} name='selectedEvent' onChange={handleChangeSelect}>
                  <option value="work">Praca</option>
                  <option value="vacation">Urlop</option>     
                </select>
              </div>
              {
                selectedEvent === 'work' && (
                  <div>
                    <label htmlFor="">Liczba godzin: </label>
                    <input type="number" value={hours} onChange={handleHoursChange} />
                  </div>
                )
              }

              <div style={styles} onClick={handleAddEvent} >Wyślij</div>
              </React.Fragment>)
            :(
              <React.Fragment>
              <div>Aktualne wydarzenia</div>
              <div style={buttonsStyle}>
                <div style={styles} onClick={handleUpdateEvent} >Aktualizuj</div>
                <div style={styles} onClick={handleDeleteEvent} >Usuń</div>
              </div>
              </React.Fragment>)
          }

        </div>

      </div>
    </div>
  );
};

export default MyCalendar;
