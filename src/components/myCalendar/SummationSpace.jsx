import '../../styles/SummationSpace.css';

export const SummationSpace = ({monthlySummary}) => (
    <div className='summationSpace'>
          <div className='summaryTitle'>Podsumowanie miesiąca</div>
          <div className='summaryItemContainer'>
            <div className='summaryItem'>Praca: {monthlySummary.workEvents} | {monthlySummary.totalWorkHours} godz.</div>
            <div className='summaryItem'>Urlop: {monthlySummary.vacationEvents}</div>
            <div className='summaryItem'>Wyjazd służbowy: {monthlySummary.businessTripEvents}</div>
            <div className='summaryItem'>Zwolnienie lekarskie: {monthlySummary.sickLeaveEvents}</div>
        </div>
    </div>
);
