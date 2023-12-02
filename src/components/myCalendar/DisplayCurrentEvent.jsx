import ShowData from "./ShowData";
import Button from "./Button";

const DisplayCurrentEvent = ({handleToUpdateSpace, showData, setDeleteConfirm}) => {
    return (
        <>
            <div className='titleOfEvent'>Aktualne wydarzenie</div>
            <div className='eventSpace'>
                <ShowData showData={showData} />
            </div>
            <div className="buttonsContainer">
                <Button action={() => setDeleteConfirm(true)} name={'Usuń'} />
                <Button action={handleToUpdateSpace} name={'Aktualizuj'} />
            </div>
        </>
    )
};

export default DisplayCurrentEvent;