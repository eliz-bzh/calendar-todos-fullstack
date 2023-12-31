import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

console.log(store.getState())
store.subscribe(() => {
    console.log('state\n', store.getState())
});

export default store;