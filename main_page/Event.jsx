import React, { useState } from 'react';

const Event = ({ selectedDay }) => {
  const [eventName, setEventName] = useState('');
  const [startSchedule, setStartSchedule] = useState('');
  const [endSchedule, setEndSchedule] = useState('');

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getDateTimeAnHourAway = () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSaveEvent = () => {
    const newEvent = {
      memberId: 1,
      eventName: eventName,
      start_schedule: startSchedule,
      end_schedule: endSchedule,
    };

    fetch('http://13.124.181.169:8080/event/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onAddEvent((prevEvents) => [...prevEvents, { ...newEvent, id: Date.now() }]);
          // setEventName('');
          // setStartSchedule('');
          // setEndSchedule('');
        } else {
          console.error('Error saving event:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };

  const handleUpdateEvent = () => {
    const requestBody = {
      eventId: 2,
      eventName: eventName,
      start_schedule: startSchedule,
      end_schedule: endSchedule,
    };

    fetch('http://13.124.181.169:8080/event/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="datetime-local"
        value={startSchedule || getCurrentDateTime()}
        onChange={(e) => setStartSchedule(e.target.value)}
      />
      <input
        type="datetime-local"
        value={endSchedule || getDateTimeAnHourAway()}
        onChange={(e) => setEndSchedule(e.target.value)}
      />
      <button onClick={handleSaveEvent}>Save Event</button>
    </div>
  );
};

export default Event;