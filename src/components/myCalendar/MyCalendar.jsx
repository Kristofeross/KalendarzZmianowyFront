import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css'; 
import '../../styles/MyCalendar.css';
import door_icon from '../assets/door.png';

//
import { SummationSpace } from './SummationSpace';
import { NextDaysInfo } from './NextDaysInfo';
import { ColorLegend } from './ColorLegend';

const MyCalendar = () => {
  const tokenUser = sessionStorage.getItem('token');

  const [date, setDate] = useState(new Date());
  const [logout, setLogout] = useState(false);
  const [selectedDate, setSelectedDate] = useState("")
  const navigate = useNavigate();
  const [sidePanel, setSidePanel] = useState(false);

  // Do Cruda
  const [isEventExist, setIsEventExist] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState('work');
  const [isCurrentEvent, setIsCurrenEvent] = useState(true);
  const [hours, setHours] = useState(1);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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

  const stringDate = date => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  // Do pierwszego wyświetlenia daty
  useEffect(() => {
    const todayDate = new Date();
    setSelectedDate( stringDate(todayDate) );
  }, []);

  // Pobranie danych na początku
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/calendar', {
      headers: {
        "Authorization": tokenUser
      }
    })
    .then(response => {
      // console.log('Sukces', response.data)
      setItems(response.data);
    })
    .catch(error => {
      console.error('Błąd', error);
    });
  }, [tokenUser]);


  // Do zmiany daty
  const onChange = date => {
    setDate(date);

    // Do formularza z godzinami
    if(selectedEvent === 'work') setHours(1);
    // Na wyświetlania oraz wysłanie daty
    setSelectedDate( stringDate(date) );
    // Do wyjścia z aktualizacji wydarzenia
    setIsCurrenEvent(true);
    setDeleteConfirm(false);
    setMessage("");

    setSidePanel(true);
  };


  // Do poprawnego wyświetlania danych
  useEffect(() => {
    const isEventFound = items.find(item => item.date === selectedDate);
    isEventFound ? setIsEventExist(false) : setIsEventExist(true);
  }, [selectedDate, items]);

  // Do poinformowaniu o wydarzeniach 
  const getEventColor = date =>{
    const eventForDate = items.find(item => item.date === date);
    if (eventForDate) {
      switch (eventForDate.entry_type) {
        case 'work':
          return 'work-event';
        case 'vacation':
          return 'vacation-event';
        case 'business_trip':
          return 'business-trip-event';
        case 'sick_leave':
          return 'sick-leave-event';
        default:
          return '';
      }
    }
    return '';
  }

  // Do obsługi wydarzeń

  const handleAddEvent = () => {
    // console.log(date);
    if( selectedEvent === 'work' && (hours > 16 || hours < 1 )){
      setMessage("Wprowadź liczbę godzin w przedziale 1-16");
      return;
    }

    let toWorkHours = null;
    if (selectedEvent === "work") toWorkHours = parseFloat(hours);
    else toWorkHours = null;

    const data = {
      // date: date,
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
      // console.log('Sukces', response);

      axios.get(`http://127.0.0.1:5000/api/calendar/getById/${response.data}`, {
        headers: {
          "Authorization": tokenUser
        }
      })
      .then(getResponse => {
        // console.log('Dane pobrane', getResponse.data);
  
        const dateToChange = getResponse.data.date;
        const newDate = dateToChange.substring(0, 10);
      
        const newItem = {
          _id: getResponse.data._id,
          date: newDate,
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
      setMessage("Wprowadź liczbę godzin w przedziale 1-16");
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
    // console.log('Dane do wysłania',data);

    const idEvent = items.find((item) => item.date === selectedDate)?._id;

    axios.put(`http://127.0.0.1:5000/api/calendar/update/${idEvent}`, data, {
      headers: {
        "Authorization": tokenUser
      }
    })
    .then(response => {
      // console.log('Sukces', response);

      axios.get(`http://127.0.0.1:5000/api/calendar/getById/${idEvent}`, {
        headers: {
          "Authorization": tokenUser
        }
      })
      .then(getResponse => {
        // console.log('Dane pobrane', getResponse.data);
  
        const dateToChange = getResponse.data.date;
        const newDate = new Date(dateToChange).toISOString().split('T')[0];

        const updatedItem = {
          _id: getResponse.data._id,
          date: newDate,
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
      // console.log('Sukces', response);

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
    // console.log(e.target.value);
    setSelectedEvent(e.target.value);
    setHours(1);
    setMessage("")
  }
  const handleHoursChange = e => {
    // console.log(e.target.value);
    setHours(e.target.value)
  }

  const showData = () => {
    return (
      items.map(item => {
        if (item.date === selectedDate) {
          return (
            <div key={item._id}>
              { item.entry_type === "work" && 
                <div>
                  <h2>Typ zdarzenia</h2>
                  <p>Praca</p>
                  <p>Godziny pracy: {item.work_hours}</p>
                </div>
              }
              { item.entry_type === "vacation" && 
                <div>
                  <h2>Typ zdarzenia</h2>
                  <p>Urlop</p>
                </div>
              }
              { item.entry_type === "business_trip" && 
                <div>
                  <h2>Typ zdarzenia</h2>
                  <p>Wyjazd służbowy</p>
                </div>
              }
              { item.entry_type === "sick_leave" && 
                <div>
                  <h2>Typ zdarzenia</h2>
                  <p>Zwolnienie lekarskie</p>
                </div>
              }
            </div>
          );
        } else {
          return null; 
        }
      })
    )
  }

  // Do ustalania nastepnych dni
  // Funkcja do uzyskania nazwy dnia tygodnia dla danego dnia
  const getDayName = (date) => {
    const dayNames = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    return dayNames[date.getDay()];
  };

  // Funkcja do uzyskania kolejnych dni i ich charakterystyki
  const getNextDaysInfo = () => {
    const today = new Date();
    const nextDays = [];
    
    for (let i = 0; i < 5; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayInfo = {
        name: i === 0 ? 'Dzisiaj' : i === 1 ? 'Jutro' : getDayName(nextDate),
        date: stringDate(nextDate),
        eventInfo: getEventInfo(nextDate),
        isToday: i === 0,
        isTomorrow: i === 1,
      };
      nextDays.push(dayInfo);
    }
  
    return nextDays;
  };
  

  // Funkcja do uzyskania informacji o wydarzeniach dla danego dnia
  const getEventInfo = (date) => {
    const eventForDate = items.find((item) => item.date === stringDate(date));
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

  // Do podsumowania danych w danym miesiącu
  const getMonthlySummary = () => {
    const currentMonth = date.getMonth() + 1;
    const workEvents = items.filter((item) => {
      const itemMonth = new Date(item.date).getMonth() + 1;
      return item.entry_type === 'work' && itemMonth === currentMonth;
    });

    const vacationEvents = items.filter((item) => {
      const itemMonth = new Date(item.date).getMonth() + 1;
      return item.entry_type === 'vacation' && itemMonth === currentMonth;
    });

    const businessTripEvents = items.filter((item) => {
      const itemMonth = new Date(item.date).getMonth() + 1;
      return item.entry_type === 'business_trip' && itemMonth === currentMonth;
    });

    const sickLeaveEvents = items.filter((item) => {
      const itemMonth = new Date(item.date).getMonth() + 1;
      return item.entry_type === 'sick_leave' && itemMonth === currentMonth;
    });

    const totalWorkHours = workEvents.reduce((total, event) => total + (event.work_hours || 0), 0);

    return {
      workEvents: workEvents.length,
      totalWorkHours,
      vacationEvents: vacationEvents.length,
      businessTripEvents: businessTripEvents.length,
      sickLeaveEvents: sickLeaveEvents.length,
    };
  };

  const monthlySummary = getMonthlySummary();


  



  return (
    // Aktualna zawartość
    <div className="container"> 
      <div className={`calendar ${sidePanel ? 'side-panel-open' : 'side-panel-closed'}`}>

        <Calendar
          onChange={onChange}
          value={date}
          className="react-calendar custom-calendar eventTooltip"
          formatShortWeekday={(locale, date) =>
            new Intl.DateTimeFormat('pl', { weekday: 'long' }).format(date) // Format na pełne nazwy dni tygodnia
          }
          tileClassName={ ({ date }) => getEventColor( stringDate(date) )}
          tileContent={()=>{
            return <div></div>
          }}
        />

      </div>

      {sidePanel && 
        <div className="second-div">
        
          {/* Górna część pojemnika - Nagłówki */}
          <div className='upBarEventSpace'>{selectedDate}</div>
          {/* Dolna część pojemnika - wydarzenia */}
          <div className='downBarEventSpace'>

            { isEventExist
              ?(
                <div>
                  <div>Dodawanie wydarzenia</div>
                  <div className="eventSpace">
                    <select value={selectedEvent} onChange={handleChangeSelect}>
                      <option value="work">Praca</option>
                      <option value="vacation">Urlop</option>
                      <option value="business_trip">Wyjazd służbowy</option>
                      <option value="sick_leave">Zwolnienie lekarskie</option>
                    </select>
                    {
                      selectedEvent === 'work' && (
                        <div>
                          <label htmlFor="">Liczba godzin: </label>
                          <input type="number" value={hours} onChange={handleHoursChange} />
                        </div>
                      )
                    }

                  </div>
                  {
                    message ? <p>{message}</p> : null
                  }
                  <div className='styles' onClick={handleAddEvent} >Dodaj</div>
                </div>
              ): isCurrentEvent ? (
                  <div>
                    {deleteConfirm ? 
                      <>
                        <div>Aktualne wydarzenia</div>
                        <h3>Czy na pewno chcesz usunąć?</h3>
                        <div className="buttonsStyle">     
                          <div className='styles' onClick={()=>handleCancelAction("delete")} >Anuluj</div>
                          <div className='styles' onClick={handleDeleteEvent} >Potwierdź</div>
                        </div>
                      </>
                      :
                      <>
                        <div>Aktualne wydarzenia</div>
                        <div className='eventSpace'>
                          {showData()}
                        </div>

                        <div className="buttonsStyle">     
                          <div className='styles' onClick={()=>setDeleteConfirm(true)} >Usuń</div>
                          <div className='styles' onClick={handleToUpdateSpace} >Aktualizuj</div>
                        </div>
                      </>
                    }
                  </div>  
                ): (
                  <div>
                    <div>Akualizowane wydarzenia</div>
                    <div className='eventSpace'>
                      <select value={selectedEvent} onChange={handleChangeSelect}>
                        <option value="work">Praca</option>
                        <option value="vacation">Urlop</option>
                        <option value="business_trip">Wyjazd służbowy</option>
                        <option value="sick_leave">Zwolnienie lekarskie</option>
                      </select>
                      {
                        selectedEvent === 'work' && (
                          <div>
                            <label htmlFor="">Liczba godzin: </label>
                            <input type="number" value={hours} onChange={handleHoursChange} />
                          </div>
                        )
                      }
                    </div>
                    {
                      message ? <p>{message}</p> : null
                    }
                    <div className='buttonsStyle'>
                      <div className='styles' onClick={()=>handleCancelAction("update")}  >Anuluj</div>
                      <div className='styles' onClick={handleUpdateEvent} >Potwierdź</div>
                    </div>
                  </div>
                )
            }

          </div>

          {/* <SummationSpace monthlySummary={monthlySummary} /> */}
          {/* <NextDaysInfo getNextDaysInfo={getNextDaysInfo} /> */}
          {/* <ColorLegend /> */}

          <div className={"exitButton"} onClick={()=> setSidePanel(false)}>
            Zwiń
          </div>   
          
          <div className={"exitButton"} onClick={handleLogout}>
            <img src={door_icon} alt="" />
            Wyloguj
          </div>

        </div>
      } 
    </div>
  );
};

export default MyCalendar;