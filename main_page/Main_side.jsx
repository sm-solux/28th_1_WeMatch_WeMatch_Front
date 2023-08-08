import React, { useState, useEffect } from 'react';
import Event from './Event';

const SideBar = ({ selectedDay }) => {
    const [events, setEvents] = useState([]);
    const [showAddEventForm, setShowAddEventForm] = useState(false);

    const fetchEventsForSelectedDay = () => {
        const formattedDate = selectedDay.toISOString().split('T')[0];
        const memberId = 2;
        const queryString = `?memberId=${memberId}&date=${formattedDate}`;

        fetch(`http://13.124.181.169:8080/event/day${queryString}`)
        .then((response) => response.json())
        .then((data) => {
        if (data.success) {
            setEvents(data.data);
        } else {
            console.error('Error fetching events:', data.message);
        }
        })
        .catch((error) => {
        console.error('Error fetching events:', error);
        });
    };
    
    useEffect(() => {
        if (selectedDay) {
            fetchEventsForSelectedDay();
        }
    }, [selectedDay]);

    const handleAddEventClick = () => {
        setShowAddEventForm(true);
    };

    const handleDeleteEvent = (eventId) => {
        fetch(`http://13.124.181.169:8080/event/delete?eventId=${eventId}`, {
          method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
        if (data.success) {
            // Filter out the deleted event from the events array
            const updatedEvents = events.filter((event) => event.eventId !== eventId);
            setEvents(updatedEvents);
        } else {
            console.error('Error deleting event:', data.message);
        }
        })
        .catch((error) => {
        console.error('Error deleting event:', error);
        });
    }
  
    return (
        <div className="sidebar">
            <h2>{selectedDay ? `${selectedDay.toDateString()}` : 'Selected Day'}</h2>
            {selectedDay && events.length > 0 ? (
            <ul>
                {events.map((event) => (
                    <li key={event.eventId}>
                        <p>{event.eventName}</p>
                        <p>{event.start_schedule} - {event.end_schedule}</p>
                        <button onClick={() => handleDeleteEvent(event.eventId)}>Delete</button>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No events for the selected day.</p>
        )}
        {selectedDay && (
            <Event selectedDay={selectedDay} onAddEvent={setEvents} />
        )}
        </div>
    );
  };
  
  export default SideBar;