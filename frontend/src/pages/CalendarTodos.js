import { React, useState } from "react";
import { Calendar, Drawer } from '../components';
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Profile from "../components/profile/profile";

const CalendarTodos = () => {

    const [clickedDate, setClickedDate] = useState(new Date(new Date().getTime() + 10800000));
    const navigate = useNavigate();
    const { singOut } = useAuth();

    const click = (date)=> {
        setClickedDate(date);
    }

    return(
        <div className='content'>
            <Profile/>
            <Calendar click={click} />
            <Drawer dateTodos={clickedDate} />
        </div>
    )
}

export default CalendarTodos;