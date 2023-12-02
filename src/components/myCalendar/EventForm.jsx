const EventForm = ({ selectedEvent, handleChangeSelect, hours, handleHoursChange }) => {
    return (
      <>
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
      </>
    );
};
  
export default EventForm;