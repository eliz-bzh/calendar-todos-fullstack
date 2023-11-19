import * as CONSTANTS from './ActionTypes';
import axios from 'axios';
import { fetchTodos } from './ActionFetchData';

export const deleteTodo = (id, dateTodos) => (dispatch) => {
    axios.delete(`/api/todos/delete/${id}`)
    .then(({ data }) => {
        dispatch(setMessage(data));
        dispatch(fetchTodos(dateTodos));
    })
}

export const setMessage = message => ({
    type: CONSTANTS.DELETE_TODO,
    payload: message
});