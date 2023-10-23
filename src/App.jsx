import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './styles/App.css';
import UserDataGet from './UserDataGet';
import LoginSignup from './components/loginSignup/LoginSingup';

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(), // Początkowa data kalendarza
    };
  }

  onChange = (date) => {
    this.setState({ date });
  }

  render() {
    return (
      // // Aktualna zawartość
      // <div className="container">        
      //   <div className="calendar">
      //     <h1>Kalendarz</h1>
      //     <Calendar
      //       onChange={this.onChange}
      //       value={this.state.date}
      //       className="react-calendar custom-calendar" // Klasa do stylizacji kalendarza
      //       formatShortWeekday={(locale, date) =>
      //         new Intl.DateTimeFormat('pl', { weekday: 'long' }).format(date) // Format na pełne nazwy dni tygodnia
      //       }
      //     />
      //   </div>
      //   <div className="second-div">
      //     <h1>Przestrzeń na wydarzenia</h1>
      //     <UserDataGet />
      //   </div>
      // </div>

      // // Login i rejestracja
      <div>
        <LoginSignup />
      </div>
    );
  }
}

export default MyCalendar;

