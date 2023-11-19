import * as CONSTANTS from '../actions/ActionTypes';

const initialState = {
    message: '',
    loading: false
}

const ReducerAddData = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_TODO:
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default ReducerAddData;