import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css'; 
import '../../styles/MyCalendar.css';
import '../../styles/SidePanel.css';
import '../../styles/Buttons.css';

import AddEvent from './AddEvent';
import UpdateEvent from './UpdateEvent';
import CurrentEvent from './CurrentEvent';
import HamburgerMenu from './HamburgerMenu';
import ThirdDiv from './ThirdDiv';

const MyCalendar = () => {
  const tokenUser = sessionStorage.getItem('token');

  const [date, setDate] = useState(new Date());
  const [logout, setLogout] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [nextDays, setNextDays] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState({});
  const [sidePanel, setSidePanel] = useState(false);
  const navigate = useNavigate();
  // Do Cruda
  const [isEventNoExist, setIsEventExist] = useState(true);
  const [isCurrentEvent, setIsCurrenEvent] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('work');
  const [hours, setHours] = useState(1);
  const [items, setItems] = useState([]);

  const [message, setMessage] = useState("");
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
  // Do przekierowania
  useEffect(() => {
    if (logout) {
      sessionStorage.removeItem('token');
      navigate('/');
    }
  }, [logout, navigate]);
  // Pobranie danych na początku
  useEffect(() => {
    const todayDate = new Date();
    setSelectedDate( stringDate(todayDate) );

    axios.get('http://127.0.0.1:5000/api/calendar', {
      headers: {
        "Authorization": tokenUser
      }
    })
    .then(response => {
      setItems(response.data);
    })
    .catch(error => {
      console.error('Błąd', error);
    });

  }, [tokenUser]);
    // Do poprawnego wyświetlania danych
  useEffect(() => {
    const isEventFound = items.find(item => item.date === selectedDate);
    isEventFound ? setIsEventExist(false) : setIsEventExist(true);
  }, [selectedDate, items]);

  const stringDate = date => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  // Do zmiany daty
  const onChange = date => {
    setDate(date);
    setSelectedDate( stringDate(date) );
    setSidePanel(true);
    if(selectedEvent === 'work') setHours(1);
    setIsCurrenEvent(true);
    setDeleteConfirm(false);
    setMessage("");
  };
  // Kolory do wydarzeń
  const getEventColor = date =>{
    const eventForDate = items.find(item => item.date === date);
    if (eventForDate) {
      switch (eventForDate.entry_type) {
        case 'work':
          return 'workEvent';
        case 'vacation':
          return 'vacationEvent';
        case 'business_trip':
          return 'businessTripEvent';
        case 'sick_leave':
          return 'sickLeaveEvent';
        default:
          return '';
      }
    }
    return '';
  }

  // Do obsługi wydarzeń
  const handleAddEvent = () => {
    if( selectedEvent === 'work' && (hours > 16 || hours < 1 )){
      setMessage("Dozwolony przedział godzin 1-16");
      return;
    }

    let toWorkHours = null;
    if (selectedEvent === "work") toWorkHours = parseInt(hours);
    else toWorkHours = null;

    const data = {
      date: selectedDate,
      entry_type: selectedEvent,
      work_hours: toWorkHours
    }

    axios.post('http://127.0.0.1:5000/api/calendar/add', data, {
      headers: {
        "Authorization": tokenUser
      }
    })
    .then(response => {
      axios.get(`http://127.0.0.1:5000/api/calendar/getById/${response.data}`, {
        headers: {
          "Authorization": tokenUser
        }
      })
      .then(getResponse => { 
        const newItem = {
          _id: getResponse.data._id,
          date: getResponse.data.date,
          entry_type: getResponse.data.entry_type,
          work_hours: getResponse.data.work_hours,
        };
        setItems([...items, newItem]);
        
        setMessage("");
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
    const selectedItem = items.find( item => item.date === selectedDate);
    if (selectedItem) {
      setSelectedEvent(selectedItem.entry_type);
      setHours(selectedItem.work_hours);
    }
    setIsCurrenEvent(false);
  }

  const handleUpdateEvent = () => {
    if(selectedEvent === 'work' && ( hours > 16 || hours < 1 ) ){
      setMessage("Dozwolony przedział godzin 1-16");
      return;
    }

    let toWorkHours = null;
    if (selectedEvent === "work") toWorkHours = parseFloat(hours);
    else toWorkHours = null;

    const data = {
      date: selectedDate,
      entry_type: selectedEvent,
      work_hours: toWorkHours
    }

    const idEvent = items.find(item => item.date === selectedDate)?._id;

    axios.put(`http://127.0.0.1:5000/api/calendar/update/${idEvent}`, data, {
      headers: {
        "Authorization": tokenUser
      }
    })
    .then(response => {
      axios.get(`http://127.0.0.1:5000/api/calendar/getById/${idEvent}`, {
        headers: {
          "Authorization": tokenUser
        }
      })
      .then(getResponse => {
        const updatedItem = {
          _id: getResponse.data._id,
          date: getResponse.data.date,
          entry_type: getResponse.data.entry_type,
          work_hours: getResponse.data.work_hours
        };

        const updatedItems = items.map(item =>
          item._id === idEvent ? updatedItem : item
        );

        setItems(updatedItems);
        setMessage("");
      })
      .catch(getError => {
        console.error('Błąd podczas pobierania danych', getError);
      });

      setIsCurrenEvent(true)
    })
    .catch(error =>{
      console.error('Błąd', error);
      setMessage("Nie zostały wprowadzone żadne zmiany");
    })
  }

  const handleDeleteEvent = () => {  
    const idEvent = items.find(item => item.date === selectedDate)?._id;
    axios.delete(`http://127.0.0.1:5000/api/calendar/delete/${idEvent}`, {
      headers: {
        "Authorization": tokenUser
      }
    })
    .then(response => {
      const updatedItems = items.filter(item => item._id !== idEvent);
      setItems(updatedItems);

      setHours(1);
    })
    .catch(error => {
      console.error('Błąd', error);
    })
  }

  const handleCancelAction = name => {
    if (name === "update") {
      setIsCurrenEvent(true)
      setMessage("");
    }
    else setDeleteConfirm(false);
  }

  // Do formularzu
  const handleChangeSelect = e =>{
    setSelectedEvent(e.target.value);
    setHours(1);
    setMessage("")
  }

  const handleHoursChange = e => {
    setHours(e.target.value)
  }

  const showData = () => {
    return items.find(item => item.date === selectedDate) || null;
  }
  useEffect(() => {
    // Funkcja do uzyskania nazwy dnia tygodnia dla danego dnia
    const getDayName = date => {
      const dayNames = ['Niedziela','Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
      return dayNames[date.getDay()];
    };
    // Funkcja do uzyskania informacji o wydarzeniach dla danego dnia
    const getEventInfo = date => {
      const eventForDate = items.find(item => item.date === stringDate(date));
      if (eventForDate) {
        switch (eventForDate.entry_type) {
          case 'work':
            return `Praca ${eventForDate.work_hours} godz.`;
          case 'vacation':
            return 'Urlop';
          case 'business_trip':
            return 'Wyjazd służbowy';
          case 'sick_leave':
            return 'Zwolnienie lekarskie';
          default:
            return '';
        }
      }
      return 'Brak wydarzenia';
    };

    // Metoda do uzyskania kolejnych dni i ich charakterystyki
    const getNextDaysInfo = () => {
      const today = new Date();
      const nextDays = [];
      
      for (let i = 0; i < 5; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const dayInfo = {
          name: i === 0 ? 'Dzisiaj' : i === 1 ? 'Jutro' : getDayName(nextDate),
          date: (stringDate(nextDate)).split('-').reverse().join('-'),
          eventInfo: getEventInfo(nextDate),
        };
        nextDays.push(dayInfo);
      }
    
      return nextDays;
    };
    
    // Do podsumowania danych w danym miesiącu
    const getMonthlySummary = () => {
      const currentMonth = date.getMonth() + 1;
      const workEvents = items.filter(item => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        return item.entry_type === 'work' && itemMonth === currentMonth;
      });

      const vacationEvents = items.filter(item => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        return item.entry_type === 'vacation' && itemMonth === currentMonth;
      });

      const businessTripEvents = items.filter(item => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        return item.entry_type === 'business_trip' && itemMonth === currentMonth;
      });

      const sickLeaveEvents = items.filter(item => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        return item.entry_type === 'sick_leave' && itemMonth === currentMonth;
      });

      const totalWorkHours = workEvents.reduce((total, event) => total + (event.work_hours || 0), 0);

      return {
        workEvents: workEvents.length,
        totalWorkHours: totalWorkHours,
        vacationEvents: vacationEvents.length,
        businessTripEvents: businessTripEvents.length,
        sickLeaveEvents: sickLeaveEvents.length,
      };
    };

    const next = getNextDaysInfo();
    const summary = getMonthlySummary();
    setNextDays(next);
    setMonthlySummary(summary);
  }, [items, date]);

  // Do zmiany paneli
  const toggleSidePanel = () =>{
    setSidePanel(!sidePanel);
  }
  

  return (

    <div className="container"> 
      <div className={`calendar ${sidePanel ? 'side-panel-open' : 'side-panel-closed'}`}>

        <Calendar
          onChange={onChange}
          value={date}
          minDetail='year'
          className="react-calendar custom-calendar"
          next2Label={null}
          prev2Label={null}
          formatShortWeekday={(locale, date) =>
            new Intl.DateTimeFormat('pl', { weekday: 'long' }).format(date)
          }
          tileClassName={ ({ date }) => getEventColor( stringDate(date) )}
        />

      </div>

      {sidePanel && 
        <div className="sidePanel">

          <div className='selectedDate'>{selectedDate.split('-').reverse().join('-')}</div>

          <div className='eventsContainer'>

            {isEventNoExist ? (
                <AddEvent
                  selectedEvent={selectedEvent}
                  hours={hours}
                  handleChangeSelect={handleChangeSelect}
                  handleHoursChange={handleHoursChange}
                  handleAddEvent={handleAddEvent}
                  message={message}
                />
              ) : isCurrentEvent ? (
                <CurrentEvent
                  deleteConfirm={deleteConfirm}
                  handleToUpdateSpace={handleToUpdateSpace}
                  handleDeleteEvent={handleDeleteEvent}
                  handleCancelAction={handleCancelAction}
                  showData={showData}
                  setDeleteConfirm={setDeleteConfirm}
                />
              ) : (
                <UpdateEvent
                  selectedEvent={selectedEvent}
                  hours={hours}
                  handleChangeSelect={handleChangeSelect}
                  handleHoursChange={handleHoursChange}
                  handleUpdateEvent={handleUpdateEvent}
                  handleCancelAction={handleCancelAction}
                  message={message}
                />
              )
            }

          </div>

          <div className='featureContainer'>
            <HamburgerMenu monthlySummary={monthlySummary} nextDays={nextDays}/>
          </div>

        </div>
      } 

      

      <ThirdDiv handleLogout={handleLogout} toggleSidePanel={toggleSidePanel} sidePanel={sidePanel} />


    </div>
  );
};

export default MyCalendar;