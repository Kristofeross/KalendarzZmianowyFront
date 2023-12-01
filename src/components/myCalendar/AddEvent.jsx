import React from 'react';
import { Message } from './Message';

const AddEvent = ({
  selectedEvent,
  hours,
  handleChangeSelect,
  handleHoursChange,
  handleAddEvent,
  message,
}) => {
  return (
    <>
      <div className='titleOfEvent'>Dodawanie wydarzenia</div>
      <div className="eventSpace">
        <select value={selectedEvent} onChange={handleChangeSelect}>
            <option value="work">Praca</option>
            <option value="vacation">Urlop</option>
            <option value="business_trip">Wyjazd służbowy</option>
            <option value="sick_leave">Zwolnienie lekarskie</option>
        </select>
        {selectedEvent === 'work' && (
          <div className='workHours'>
            <label >Liczba godzin: </label>
            <input type="number" value={hours} onChange={handleHoursChange} />
          </div>
        )}
        {message && <Message message={message} />}
      </div>
      

      <div className="buttonsContainer">
        <div className='buttonStyle oneButton' onClick={handleAddEvent} >Dodaj</div>
      </div>
    </>
  );
};

export default AddEvent;