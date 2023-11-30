import React from 'react';

const AddEvent = ({
  selectedEvent,
  hours,
  handleChangeSelect,
  handleHoursChange,
  handleAddEvent,
  message,
}) => {
  return (
    <div className=''>
      <div>Dodawanie wydarzenia</div>
      <div className="eventSpace">
        <select value={selectedEvent} onChange={handleChangeSelect}>
            <option value="work">Praca</option>
            <option value="vacation">Urlop</option>
            <option value="business_trip">Wyjazd służbowy</option>
            <option value="sick_leave">Zwolnienie lekarskie</option>
        </select>
        {selectedEvent === 'work' && (
          <div>
            <label htmlFor="">Liczba godzin: </label>
            <input type="number" value={hours} onChange={handleHoursChange} />
          </div>
        )}
      </div>
      {message && <p>{message}</p>}
      <div className='styles' onClick={handleAddEvent} >Dodaj</div>
    </div>
  );
};

export default AddEvent;