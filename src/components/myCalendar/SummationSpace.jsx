import '../../styles/SummationSpace.css';

export const SummationSpace = props => (
    <div className='summationSpace'>
          <div className='summaryTitle'>Podsumowanie miesiąca</div>
          <div className='summaryItem'>Praca: {props.monthlySummary.workEvents} | {props.monthlySummary.totalWorkHours} godz.</div>
          <div className='summaryItem'>Urlop: {props.monthlySummary.vacationEvents}</div>
          <div className='summaryItem'>Wyjazd służbowy: {props.monthlySummary.businessTripEvents}</div>
          <div className='summaryItem'>Zwolnienie lekarskie: {props.monthlySummary.sickLeaveEvents}</div>
    </div>
)