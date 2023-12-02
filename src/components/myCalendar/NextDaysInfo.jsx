import DayInfo from './DayInfo';
import '../../styles/NextDaysInfo.css';

export const NextDaysInfo = ({nextDays}) => {
  const dayInfoComponents = nextDays.map(dayInfo => <DayInfo key={dayInfo.date} date={dayInfo.date} name={dayInfo.name} eventInfo={dayInfo.eventInfo} />);
  return(
    <div className='nextDaysInfo'>
      <div className='infoTitle'>Najbliższe dni</div>
      {dayInfoComponents}
    </div>
  )
};
