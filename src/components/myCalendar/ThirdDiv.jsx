import door_icon from '../assets/door.png';
import left_icon from '../assets/leftArrow.png';
import right_icon from '../assets/rigtArrow.png';

import '../../styles/ThirdDiv.css';

import { Tooltip } from 'react-tooltip';

const ThirdDiv = ({handleLogout, toggleSidePanel, sidePanel}) => {
    let accordionTooltip = sidePanel ? 'Zwiń' : 'Rozwiń';

    return(
        <div className='thirdDiv'>
            <div className='exitPanel' 
                onClick={handleLogout} 
                data-tooltip-id='exitTooltip'
                data-tooltip-delay-show={1000}
                data-tooltip-place='bottom'
            >
            <img src={door_icon} alt="Ikona_wyjścia" />
            </div>
            <div className='hamburgerPanel' 
                onClick={toggleSidePanel} 
                data-tooltip-id='accordionTooltip'
                data-tooltip-delay-show={1000}
                data-tooltip-place='left'
            >
                <img src={sidePanel ? left_icon : right_icon} alt="Ikona_rozwijania" />
            </div>

            <Tooltip id='exitTooltip'>Wyloguj</Tooltip>
            <Tooltip id='accordionTooltip'>{accordionTooltip}</Tooltip>
        </div>
    )
};

export default ThirdDiv;
