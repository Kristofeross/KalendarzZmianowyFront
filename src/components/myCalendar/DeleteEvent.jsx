const DeleteEvent = ({handleCancelAction, handleDeleteEvent}) => (
    <>
        <div className='titleOfEvent'>Usuwane wydarzenia</div>
        <div className='eventSpace'>Czy na pewno chcesz usunąć?</div>
        <div className="buttonsContainer">     
            <div className='buttonStyle twoButtons' onClick={()=>handleCancelAction("delete")} >Anuluj</div>
            <div className='buttonStyle twoButtons' onClick={handleDeleteEvent} >Potwierdź</div>
        </div>
    </>
)

export default DeleteEvent;