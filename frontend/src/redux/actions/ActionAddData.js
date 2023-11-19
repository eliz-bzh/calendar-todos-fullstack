import * as CONSTANTS from './ActionTypes';
import axios from 'axios';
import { fetchTodos } from './ActionFetchData';

export const createTodo = (todo) => (dispatch) => {
    axios.post(`/api/todos/create`, {
        todo: todo.label,
        adress: todo.adress,
        dateStart: todo.dateStart,
        dateEnd: todo.dateEnd,
        description: todo.description,
        allDay: todo.allDay,
        driver_id: todo.driver_id,
        user_id: todo.user_id,
    })
    .then(({ data }) => {
        dispatch(setMessage(data));
        dispatch(fetchTodos(todo.dateStart));
    })
}

export const setMessage = message => ({
    type: CONSTANTS.ADD_TODO,
    payload: message
});