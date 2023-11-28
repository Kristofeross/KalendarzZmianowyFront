import '../../styles/ColorLegend.css';

export const ColorLegend = () => (
    <div className="colorLegend">
        <div className="colorLegendEvent workColor">
            Praca (czerwony)
        </div>
        <div className="colorLegendEvent vacationColor">
            Urlop (niebieski)
        </div>
        <div className="colorLegendEvent business-tripColor">
            Wyjazd służbowy (zielony)
        </div>
        <div className="colorLegendEvent sick-leaveColor">
            Zwolnienie lekarskie (fioletowe)
        </div>
    </div>
)