import { React } from 'react';
import { months } from '../../constants';

const DateHeader = ({ date, previousMonth, nextMonth }) =>{

    return(
        <div className='header'>
            <button className='btn btn-outline-primary' onClick={()=>previousMonth()}><i className="bi bi-arrow-left"/></button>
            <span className='month-name'>{months[date.getMonth()]}, {date.getFullYear()}</span>
            <button className='btn btn-outline-primary' onClick={()=>nextMonth()}><i className="bi bi-arrow-right"/></button>
        </div>
    )
}

export default DateHeader;