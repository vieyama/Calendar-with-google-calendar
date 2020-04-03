import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import get from "lodash/get";
import axios from "axios";

const App = () => {
    const calendarComponentRef = React.createRef();
    const [calendarWeekends, setCalendarWeekends] = useState(true);
    const [calendarEvents, setCalendarEvents] = useState([
        { title: "Event Now", start: "2020-04-02", end: new Date() },
        { title: "Hari raya nyepi", start: "2019-03-07", end: "2019-03-08" },
        { title: "Event next day", start: "2020-04-04", end: "" }
    ]);

    const getData = async () => {
        await axios
            .get(
                "https://www.googleapis.com/calendar/v3/calendars/id.indonesian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyA5epbs8RfEj26qM2ixMwcMtMeJIReAFKg"
            )
            .then(res => {
                 const { data } = res;
                 const callendarData = data.items.map(item => {
                     return {
                         title: item.summary,
                         start: get(item, "start.date", ""),
                         end: get(item, "end.date", "")
                     };
                 });

                 // Lel
                 setCalendarEvents(callendarData);
            });
    };
    useEffect(() => {
        getData();
    }, []);
    // console.log(calendarEvents);

    const toggleWeekends = () => {
        setCalendarWeekends(!calendarWeekends);
    };

    const handleDateClick = arg => {
        if (alert("Would you like to add an event to " + arg.dateStr + " ?")) {
            this.setState({
                // add new event data
                calendarEvents: calendarEvents.concat({
                    // creates a new array
                    title: "New Event",
                    start: arg.date,
                    allDay: arg.allDay
                })
            });
        }
    };

    return (
        <div className="demo-app">
            <div className="demo-app-top">
                <button onClick={toggleWeekends}>toggle weekends</button>
                &nbsp; &nbsp; (also, click a date/time to add an event)
            </div>
            <div className="demo-app-calendar">
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={calendarComponentRef}
                    weekends={calendarWeekends}
                    events={calendarEvents}
                    dateClick={handleDateClick}
                />
            </div>
        </div>
    );
};

export default App;
