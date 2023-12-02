const DayInfo = ({date, name, eventInfo}) => (
    <div key={date} className='dayInfo'>
      <div className='dayName'>{name}: {date}</div>
      <div className='eventInfo'>Wydarzenie: {eventInfo}</div>
    </div>
);

export default DayInfo;