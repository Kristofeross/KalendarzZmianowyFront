import React from 'react';
import DeleteEvent from './DeleteEvent';
import DisplayCurrentEvent from './DisplayCurrentEvent';

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

        <DeleteEvent 
          handleCancelAction={handleCancelAction} 
          handleDeleteEvent={handleDeleteEvent} 
        />
      ) : (
        <DisplayCurrentEvent 
          handleToUpdateSpace={handleToUpdateSpace} 
          showData={showData}
          setDeleteConfirm={setDeleteConfirm}
        />
      )}
    </>
  );
};

export default CurrentEvent;