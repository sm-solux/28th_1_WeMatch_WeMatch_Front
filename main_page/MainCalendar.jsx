import React, { Component } from 'react';
import CalendarDays from './CalendarDays';
import Main_side from './Main_side';
import './MainCalendar.css'

export default class MainCalendar extends Component {
  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.state = {
      selectedDay: new Date(),
    };
  }

  handleSelectDay = (day) => {
    this.setState({ selectedDay: new Date(day.date) });
  };

  render() {
    return (
      <div className='container'>
       <div className='side-bar'>
          <Main_side selectedDay={this.state.selectedDay} />
        </div>
        <div className="calendar">
          <div className="calendar-header">
            <h2>
              {this.months[this.state.selectedDay.getMonth()]} {this.state.selectedDay.getFullYear()}
            </h2>
          </div>
          <div className="calendar-body">
            <div className="table-header">
              {this.weekdays.map((weekday) => {
                return (
                  <div className="weekday">
                    <p>{weekday}</p>
                  </div>
                );
              })}
            </div>
            <CalendarDays 
              day={this.state.selectedDay}
              onSelectDay={this.handleSelectDay}
            />
          </div>
        </div>
      </div>
    );
  }
}