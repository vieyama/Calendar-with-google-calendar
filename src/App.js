import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import get from "lodash/get";
import axios from "axios";

const App = () => {
    const calendarComponentRef = React.createRef();
    const [calendarWeekends, setCalendarWeekends] = useState(true);
    const [calendarEvents, setCalendarEvents] = useState([]);

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
            <div className="demo-app-calendar">
                <Row style={{ paddingTop: "50px", paddingBottom: "50px" }}>
                    <Col>
                        <div className="demo-app-top">
                            <Button onClick={toggleWeekends}>
                                toggle weekends
                            </Button>
                            &nbsp; &nbsp; (also, click a date/time to add an
                            event)
                        </div>
                    </Col>
                    <Col md="24">
                        <FullCalendar
                            defaultView="dayGridMonth"
                            header={{
                                left: "prev,next today",
                                center: "title",
                                right:
                                    "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                            }}
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin
                            ]}
                            ref={calendarComponentRef}
                            weekends={calendarWeekends}
                            events={calendarEvents}
                            dateClick={handleDateClick}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default App;
