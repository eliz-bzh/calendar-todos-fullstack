import * as CONSTANTS from './ActionTypes';
import axios from 'axios';

export const setLoad = loader => ({
    type: CONSTANTS.SET_LOADER,
    payload: loader
});

export const fetchTodos = (date) => (dispatch) => {
    axios.get(`/api/todos`)
        .then(({ data }) => {
            dispatch(setTodos(data));
            dispatch(setLoad(false));
            dispatch(fetchTodosByDate(date));
        })
}

export const setTodos = todos => ({
    type: CONSTANTS.FETCH_TODOS,
    payload: todos
});

export const fetchTodosByDate = (currentDate) => (dispatch) => {
    dispatch(setTodosByDate(currentDate));
}

export const setTodosByDate = currentDate => ({
    type: CONSTANTS.FETCH_TODOS_BY_DATE,
    payload: currentDate
});

export const fetchDrivers = () => (dispatch) => {
    axios.get(`/api/drivers`)
    .then(({ data }) => {
        dispatch(setDrivers(data));
        dispatch(setLoad(false));
    })
}

export const setDrivers = drivers => ({
    type: CONSTANTS.FETCH_DRIVER,
    payload: drivers
});

export const fetchUsers = () => (dispatch) => {
    axios.get(`/api/users`)
    .then(({ data }) => {
        dispatch(setUsers(data));
        dispatch(setLoad(false));
    })
}

export const setUsers = users => ({
    type: CONSTANTS.FETCH_USER,
    payload: users
});