import React from "react";
import { Calendar, Badge } from "antd";
import GoogleLogin from "react-google-login";
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import get from 'lodash/get';
const App = () => {

    const [dataDateEvent, setDataDateEvent] = useState([]);

    const getData = async () => {
        await axios
            .get(
                "https://www.googleapis.com/calendar/v3/calendars/id.indonesian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyA5epbs8RfEj26qM2ixMwcMtMeJIReAFKg"
            )
            .then(res => {
                const { data } = res;
                setDataDateEvent(data.items);
            });
    }
    useEffect(() => {
        getData();
    }, [])

    
    function getListData(value) {
        let listData;
        switch (value.date()) {
            case 1:
                listData = [
                    { type: "warning", content: "This is warning event." },
                    { type: "success", content: "This is usual event." }
                ];
                break;
            case 31:
                listData = [
                    { type: "warning", content: "This is warning event." },
                    { type: "success", content: "This is usual event." }
                ];
                break;

            default:
        }
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    const responseGoogle = res => {
        console.log(res);
        
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    return (
        <div>
            {/* {dataDateEvent.map((item, i) =>
                console.log(get(item, "start.date", "").slice(8))
            )} */}
            <GoogleLogin
                clientId="355552160033-oag92gar7e7u0t65cn3vfpnsefa2ilm7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
            />
            <Calendar
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
        </div>
    );
};

export default App;
