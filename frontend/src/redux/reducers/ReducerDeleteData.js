import * as CONSTANTS from '../actions/ActionTypes';

const initialState = {
    message: '',
    loading: false
}

const ReducerDeleteData = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.DELETE_TODO:
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default ReducerDeleteData;