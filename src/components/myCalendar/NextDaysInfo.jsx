import '../../styles/NextDaysInfo.css';

export const NextDaysInfo = props => (
    <div className='nextDaysInfo'>
            <div className='infoTitle'>Najbliższe dni</div>
            {props.getNextDaysInfo().map(dayInfo => (
              <div key={dayInfo.date} className='dayInfo'>
                <div className='dayName'>{dayInfo.name}: {(dayInfo.date).split('-').reverse().join('-')}</div>
                <div className='eventInfo'>Wydarzenie: {dayInfo.eventInfo}</div>
              </div>
            ))}
    </div>
)