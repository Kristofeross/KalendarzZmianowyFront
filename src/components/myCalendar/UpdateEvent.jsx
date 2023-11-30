import React from 'react';

const UpdateEvent = ({
  selectedEvent,
  hours,
  handleChangeSelect,
  handleHoursChange,
  handleUpdateEvent,
  handleCancelAction,
  message,
}) => {
  return (
    <div className=''>
      <div>Akualizowane wydarzenia</div>
      <div className='eventSpace'>
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
      <div className='buttonsStyle'>
        <div className='styles' onClick={() => handleCancelAction("update")}>Anuluj</div>
        <div className='styles' onClick={handleUpdateEvent}>Potwierdź</div>
      </div>
    </div>
  );
};

export default UpdateEvent;