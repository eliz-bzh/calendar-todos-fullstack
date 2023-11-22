import { React, useState } from "react";
import { Calendar, Drawer } from '../components';
import Profile from "../components/profile/profile";

const CalendarTodos = () => {

    const [clickedDate, setClickedDate] = useState(new Date(new Date().getTime() + 10800000));

    const click = (date)=> {
        setClickedDate(date);
    }

    return(
        <div className='content'>
            <Profile />
            <Calendar click={click} />
            <Drawer dateTodos={clickedDate} />
        </div>
    )
}

export default CalendarTodos;