export const SummationSpace = props => (
    <div className='summationSpace'>
          <h4>Podsumowanie miesiąca</h4>
          <p>Praca: {props.monthlySummary.workEvents} | {props.monthlySummary.totalWorkHours} godzin</p>
          <p>Urlop: {props.monthlySummary.vacationEvents}</p>
          <p>Wyjazd służbowy: {props.monthlySummary.businessTripEvents}</p>
          <p>Zwolnienie lekarskie: {props.monthlySummary.sickLeaveEvents}</p>
    </div>
)