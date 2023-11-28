export const NextDaysInfo = props => (
    <div className='nextDaysInfo'>
            <h2>Najbliższe dni</h2>
            {props.getNextDaysInfo().map(dayInfo => (
              <div key={dayInfo.date}>
                <h4>{dayInfo.name}: {dayInfo.date}</h4>
                <p>Wydarzenie: {dayInfo.eventInfo}</p>
              </div>
            ))}
    </div>
)