import { React } from 'react';
import { useSelector } from 'react-redux';

const DateTBody = ({ previousDays, currentDays, nextDays, handleClick, currentDate }) => {

    const { todos } = useSelector(({ fetchDataReducer })=> fetchDataReducer);
    const current = (el) => (new Date().toLocaleString('en-GB', {dateStyle:'medium'}) === new Date(currentDate.getFullYear(), currentDate.getMonth(), el+1).toLocaleString('en-GB', {dateStyle:'medium'}))?('current-date'):('');
    const todosByDay = (day) =>{
        const tod = todos.filter(el=>new Date(el.dateStart).toDateString() === day.toDateString())
        return tod;
    };

    return(
        <ol className='days-grid'>
            {previousDays.map((el, index)=>
                <li key={index} className='calendar-day previous-month-day'><span>{el+1}</span></li>
            )}
            {currentDays.map((el, index)=>
                <li key={index} className={`calendar-day ${current(el)}`} onClick={()=>handleClick(el+1)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <span>{el+1}</span>
                    {todosByDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), el+1)).map((todo, index)=><p key={index}>{todo.todo}</p>)}
                </li>
            )}
            {nextDays.map((el, index)=>
                <li key={index} className='calendar-day next-month-day'><span>{el+1}</span></li>
            )}
        </ol>
    )
}

export default DateTBody;