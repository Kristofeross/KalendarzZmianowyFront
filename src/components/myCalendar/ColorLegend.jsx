import '../../styles/ColorLegend.css';

export const ColorLegend = () => (
    <div className="colorLegend">
        <div className='legendTitle'>Legenda kolorów</div>
        <div className='colorLegendContainer'>
        <div className="colorLegendEvent todayColor">
                <p>Dzisiejszy dzień (ciemnoszary)</p>
            </div>
            <div className="colorLegendEvent selectedColor">
                <p>Wybrany dzień (granatowy)</p>
            </div>
            <div className="colorLegendEvent workColor">
                <p>Praca (czerwony)</p>
            </div>
            <div className="colorLegendEvent vacationColor">
                <p>Urlop (źółty)</p>
            </div>
            <div className="colorLegendEvent businessTripColor">
                <p>Wyjazd służbowy (zielony)</p>
            </div>
            <div className="colorLegendEvent sickLeaveColor">
                <p>Zwolnienie lekarskie (morski)</p>
            </div>
        </div>
    </div>
);
