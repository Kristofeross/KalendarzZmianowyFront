import { useState } from 'react';
import { NextDaysInfo } from './NextDaysInfo';
import { SummationSpace } from './SummationSpace';
import { ColorLegend } from './ColorLegend';

import hamburger_icon from '../assets/menu.png'; 
import '../../styles/HamburgerMenu.css';

const HamburgerMenu = ({monthlySummary, nextDays}) => {

    const [showHamburgerBar, setShowHamburgerBar] = useState(false);
    const [showNextDaysInfo, setShowNextDaysInfo] = useState(false);
    const [showSummationSpace, setShowSummationSpace] = useState(false);
    const [showColorLegend, setShowColorLegend] = useState(false);

    const toggleHamburgerBar = () => {
        setShowHamburgerBar(!showHamburgerBar);
        if (!showHamburgerBar) {
            setShowNextDaysInfo(false);
            setShowColorLegend(false);
            setShowSummationSpace(false);
        }
    };

    const toggleColorLegend = () => {
        setShowNextDaysInfo(false);
        setShowSummationSpace(false);
        setShowColorLegend(true);
        setShowHamburgerBar(false);
    };

    const toggleNextDaysInfo = () => {
        setShowHamburgerBar(false);
        setShowSummationSpace(false);
        setShowColorLegend(false);
        setShowNextDaysInfo(true);
    };

    const toggleSummationSpace = () => {
        setShowHamburgerBar(false);
        setShowNextDaysInfo(false);
        setShowColorLegend(false);
        setShowSummationSpace(true);
    };

    return (
        <>
            <div className='hamburgerIconContainer'>
                <img src={hamburger_icon} alt="hamburger_icon" onClick={toggleHamburgerBar} />
            </div>
            {showHamburgerBar && 
                <div className='hamburgerBarContainer'>
                    <div className="hamburgerItem" onClick={toggleNextDaysInfo}>Najbliższe dni kalendarza</div>
                    <div className="hamburgerItem" onClick={toggleSummationSpace}>Podsumowanie miesiąca</div>
                    <div className="hamburgerItem" onClick={toggleColorLegend}>Legenda kolorów</div>
                </div>
            }
            {showNextDaysInfo &&
                <NextDaysInfo nextDays={nextDays} />
            }
            {showSummationSpace &&
                <SummationSpace monthlySummary={monthlySummary} />
            }
            {showColorLegend &&
                <ColorLegend />
            }
        </>
    )
};

export default HamburgerMenu;