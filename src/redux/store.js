import { createStore, combineReducers, applyMiddleware } from 'redux';

import recordReducer from './reducers/record.reducer';
import socketReducer from './reducers/socket.reducer'
import convarsetionReducer from './reducers/convarsetion.reducer'
import generalReducer from './reducers/general.reducer'


import {
    createdEventFromSocket,
} from './middlewares/crud';

const reducer = combineReducers({
    recordReducer,
    socketReducer,
    convarsetionReducer,
    generalReducer
});

const store = createStore(
    reducer,
    applyMiddleware(
        createdEventFromSocket,
    ));

window.store = store;
export default store;

// store.dispatch({ type: 'CREATED_EVENT_FROM_SOCKET' });