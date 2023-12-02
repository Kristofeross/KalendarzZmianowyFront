import React from 'react';
import EventForm from './EventForm';
import Message from './Message';
import Button from './Button';

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
        <EventForm
          selectedEvent={selectedEvent}
          handleChangeSelect={handleChangeSelect}
          hours={hours}
          handleHoursChange={handleHoursChange}
        />
        {message && <Message message={message} />}
      </div>
      <div className='buttonsContainer'>
        <Button action={() => handleCancelAction("update")} name={'Anuluj'} />
        <Button action={handleUpdateEvent} name={'Potwierdź'} />
      </div>
    </>
  );
};

export default UpdateEvent;