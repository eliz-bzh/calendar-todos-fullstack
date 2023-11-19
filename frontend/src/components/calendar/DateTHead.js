import { React } from 'react';
import { daysOfWeek } from '../../constants';

const DateTHead = () => {

    return(
        <ol className='day-of-week'>
            {daysOfWeek.map((el, index)=>
                <li key={index} className='day-name'>
                    <span>{el}</span>
                </li>
            )}
        </ol>
    )
}

export default DateTHead;