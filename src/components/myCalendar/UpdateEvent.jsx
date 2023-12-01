import React from 'react';
import { Message } from './Message';

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
    <>
      <div className='titleOfEvent'>Akualizowane wydarzenie</div>
      <div className='eventSpace'>
        <select value={selectedEvent} onChange={handleChangeSelect}>
            <option value="work">Praca</option>
            <option value="vacation">Urlop</option>
            <option value="business_trip">Wyjazd służbowy</option>
            <option value="sick_leave">Zwolnienie lekarskie</option>
        </select>
        {selectedEvent === 'work' && (
          <div className='workHours'>
            <label htmlFor="">Liczba godzin: </label>
            <input type="number" value={hours} onChange={handleHoursChange} />
          </div>
        )}
        {message && <Message message={message} />}
      </div>
      <div className='buttonsContainer'>
        <div className='buttonStyle twoButtons' onClick={() => handleCancelAction("update")}>Anuluj</div>
        <div className='buttonStyle twoButtons' onClick={handleUpdateEvent}>Potwierdź</div>
      </div>
    </>
  );
};

export default UpdateEvent;