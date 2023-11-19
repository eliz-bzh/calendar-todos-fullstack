import { combineReducers } from 'redux';
import fetchDataReducer from './ReducerFetchData';
import deleteReducer from './ReducerDeleteData';

const rootReducer = combineReducers({
    fetchDataReducer,
    deleteReducer
});

export default rootReducer;