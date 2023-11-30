import React from 'react';

const CurrentEvent = ({
  deleteConfirm,
  handleToUpdateSpace,
  handleDeleteEvent,
  handleCancelAction,
  showData,
  setDeleteConfirm,
}) => {
  return (
    <div className=''>
      {deleteConfirm ? (
        <>
            <div>Aktualne wydarzenia</div>
            <h3>Czy na pewno chcesz usunąć?</h3>
            <div className="buttonsStyle">     
                <div className='styles' onClick={()=>handleCancelAction("delete")} >Anuluj</div>
                <div className='styles' onClick={handleDeleteEvent} >Potwierdź</div>
            </div>
        </>
      ) : (
        <>
          <div>Aktualne wydarzenia</div>
          <div className='eventSpace'>
            {showData()}
          </div>
          <div className="buttonsStyle">
            <div className='styles' onClick={() => setDeleteConfirm(true)}>Usuń</div>
            <div className='styles' onClick={handleToUpdateSpace}>Aktualizuj</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentEvent;