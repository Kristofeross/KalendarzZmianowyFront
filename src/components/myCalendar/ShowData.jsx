const ShowData = ({showData}) => {
    const currentEventItem = showData();

    if (!currentEventItem) {
        return null;
    }

    switch (currentEventItem.entry_type) {
        case 'work':
            return (
                <div className='currentEventItem'>
                    Wydarzenie: Praca - {currentEventItem.work_hours} godz.
                </div>
            );
    case 'vacation':
        return (
            <div className='currentEventItem'>
                Wydarzenie: Urlop
            </div>
        );
    case 'business_trip':
        return (
            <div className='currentEventItem'>
                Wydarzenie: Wyjazd służbowy
            </div>
        );
    case 'sick_leave':
        return (
            <div className='currentEventItem'>
                Wydarzenie: Zwolnienie lekarskie
            </div>
        );
    default:
      return null;
  }
}

export default ShowData;
