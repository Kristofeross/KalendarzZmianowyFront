import Button from "./Button";

const DeleteEvent = ({handleCancelAction, handleDeleteEvent}) => (
    <>
        <div className='titleOfEvent'>Usuwane wydarzenia</div>
        <div className='eventSpace'>Czy na pewno chcesz usunąć?</div>
        <div className="buttonsContainer">     
            <Button action={()=>handleCancelAction("delete")} name={'Anuluj'} />
            <Button action={handleDeleteEvent} name={'Potwierdź'} />
        </div>
    </>
)

export default DeleteEvent;