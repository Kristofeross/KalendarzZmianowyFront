import React from 'react';
import EventForm from './EventForm';
import Message from './Message';
import Button from './Button';

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
        <EventForm
          selectedEvent={selectedEvent}
          handleChangeSelect={handleChangeSelect}
          hours={hours}
          handleHoursChange={handleHoursChange}
        />
        {message && <Message message={message} />}
      </div>
      
      <div className="buttonsContainer">
        <Button action={handleAddEvent} name={'Dodaj'} />
      </div>
    </>
  );
};

export default AddEvent;