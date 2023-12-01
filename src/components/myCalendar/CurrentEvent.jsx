import React from 'react';
import DeleteEvent from './DeleteEvent';

const CurrentEvent = ({
  deleteConfirm,
  handleToUpdateSpace,
  handleDeleteEvent,
  handleCancelAction,
  showData,
  setDeleteConfirm,
}) => {


  return (
    <>
      {deleteConfirm ? (

        <DeleteEvent handleCancelAction={handleCancelAction} handleDeleteEvent={handleDeleteEvent} />
      ) : (
        <>
          <div className='titleOfEvent'>Aktualne wydarzenie</div>
          <div className='eventSpace'>
            {showData()}
          </div>
          <div className="buttonsContainer">
            <div className='buttonStyle twoButtons' onClick={() => setDeleteConfirm(true)}>Usuń</div>
            <div className='buttonStyle twoButtons' onClick={handleToUpdateSpace}>Aktualizuj</div>
          </div>
        </>
      )}
    </>
  );
};

export default CurrentEvent;