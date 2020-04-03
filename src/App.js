import React, { useState, useEffect } from "react";
import { Button, Row, Col, Modal } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import allLocales from "@fullcalendar/core/locales-all";
import get from "lodash/get";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";

const App = () => {
    const calendarComponentRef = React.createRef();
    const [calendarWeekends, setCalendarWeekends] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [eventDetail, setEventDetail] = useState({});
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
                        end: get(item, "end.date", ""),
                        backgroundColor: "#ff0000",
                        borderColor: "#ff0000"
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
        setOpenModal(true);
        setEventDetail({
            title: arg.event.title,
            start: moment(arg.event.start).format("LLLL"),
            end: moment(arg.event.end).format("LLLL")
        });
        
    };

    const handleOk = () => setOpenModal(false);
    const handleCancel = () => setOpenModal(false);

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
                    <Col>
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
                            eventClick={handleDateClick}
                            locales={allLocales}
                            locale={"id"}
                        />
                    </Col>
                </Row>
                <Modal
                    title="Basic Modal"
                    visible={openModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Event : {eventDetail.title}</p>
                    <p>Tanggal Mulai : {eventDetail.start}</p>
                    <p>Tanggal Berakhir : {eventDetail.end}</p>
                </Modal>
            </div>
            {console.log(typeof eventDetail.start)}
        </div>
    );
};

export default App;
