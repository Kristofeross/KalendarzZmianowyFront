import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css'; 
import '../../styles/MyCalendar.css';

const MyCalendar = () => {

  const tokens = sessionStorage.getItem('token');

  const [date, setDate] = useState(new Date());
  const [logout, setLogout] = useState(false);
  const [selectedDate, setSelectedDate] = useState("")
  const navigate = useNavigate();

  // Do Cruda
  const [isEventExist, setIsEventExist] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState('work');
  const [isCurrentEvent, setIsCurrenEvent] = useState(true);
  const [hours, setHours] = useState("");
  const [items, setItems] = useState([]);
  // const [isUpdating] = useState(false);
  // const [isDeleting] = useState(false);

  

  // Do zmiany daty
  const onChange = (date) => {
    setDate(date);

    // Na wysłanie danych
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);

  };

  // Do wylogowania
  const handleLogout = () => {
    setLogout(true);
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


  
  // Podreczne do styli
  const styles = {cursor: 'pointer',border: '1px solid #000',padding: '5px',margin: '2px 0'};
  const buttonsStyle = {display: 'flex'} 

  // Do obsługi wydarzeń

  const handleAddEvent = () => {
    const data = {
      // date: date,
      date: selectedDate,
      entry_type: selectedEvent,
      work_hours: parseFloat(hours)
    }
    console.log("Wysyłane dane",data)
    axios.post('http://127.0.0.1:5000/api/calendar/add', data, {
      headers: {
        "Authorization": tokens
      }
    })
    .then(response => {
      console.log('Sukces', response);

      axios.get(`http://127.0.0.1:5000/api/calendar/getById/${response.data}`, {
        headers: {
          "Authorization": tokens
        }
      })
      .then(getResponse => {
        console.log('Dane pobrane', getResponse.data);
  
        const dateToChange = getResponse.data.date;
        const newDate = dateToChange.substring(0, 10);
      
        const newItem = {
          id: getResponse.data._id,
          date: newDate,
          entry_type: getResponse.data.entry_type,
          work_hours: getResponse.data.work_hours,
        };
        setItems([...items, newItem]);
      
        setIsEventExist(false);
      })
      .catch(getError => {
        console.error('Błąd podczas pobierania danych', getError);
      });
    })
    .catch(error => {
      console.error('Błąd', error);
    });

  }

  const handleToUpdateSpace = () => {
    setIsCurrenEvent(false);
  }

  const handleUpdateEvent = () => {
    console.log("Aktualizowanie")

    // console.log('Items:',items)
    // console.log('Items[0]:',items[0])
    // console.log('Items[0].id:',items[0].id)
    // console.log('Items[0].date:',items[0].date)
    // console.log('Items[0].type:',items[0].entry_type)
    // console.log('Items[0].hours:',items[0].work_hours)
    // console.log('selectedDate:',selectedDate)
    // console.log('date:',date)

  }

  const handleDeleteEvent = () => {
    console.log("Usuwanie")
  }
  const handleCancelAction = () => {
    setIsCurrenEvent(true)
  }


  // Do formularzu
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


  // /////////////////////////////////////////////////////////////////////////
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
        </div>
        {/* Dolna część pojemnika - wydarzenia */}
        <div className='downBarEventSpace'>

          {isEventExist
            ?(
              <div>
                <div>Dodawanie wydarzenia</div>
                <div className="eventSpace">
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
                </div>

                <div style={styles} onClick={handleAddEvent} >Wyślij</div>
              </div>
            ): isCurrentEvent ? (
                <div>
                  <div>Aktualne wydarzenia</div>
                  <div className='eventSpace'>
                  {items.map(item => {
                    if (item.date === selectedDate) {
                      return (
                        <div key={item.id}>
                          <p>ID: {item.id}</p>
                          <p>Data: {item.date}</p>
                          <p>Typ: {item.entry_type}</p>
                          <p>Godziny pracy: {item.work_hours}</p>
                        </div>
                      );
                    } else {
                      return null; 
                    }
                  })}
                  </div>
                  <div style={buttonsStyle}>
                    <div style={styles} onClick={handleToUpdateSpace} >Aktualizuj</div>
                    <div style={styles} onClick={handleDeleteEvent} >Usuń</div>
                  </div>
                </div>  
              ): (
                <div>
                  <div>Akualizowane wydarzenia</div>
                  <div className='eventSpace'>
                    Na razie byle co
                  </div>
                  <div style={buttonsStyle}>
                    <div style={styles} onClick={handleCancelAction} >Anuluj</div>
                    <div style={styles} onClick={handleUpdateEvent} >Potwierdź</div>
                  </div>
                </div>
              )
          }

        </div>

      </div>   
    </div>
  );
};

export default MyCalendar;
