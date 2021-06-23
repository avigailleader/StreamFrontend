import { createStore, combineReducers, applyMiddleware } from 'redux';

import recordReducer from './reducers/record.reducer';
import socketReducer from './reducers/socket.reducer'
import convarsetionReducer from './reducers/convarsetion.reducer'
import userReducer from './reducers/user.reducer'


import {
    joinedEventFromSocket,
    createdEventFromSocket,
    addLocalStream,
    closeCamera


} from './middlewares/crud';

const reducer = combineReducers({
    recordReducer,
    socketReducer,
    convarsetionReducer,
    userReducer
});

const store = createStore(
    reducer,
    applyMiddleware(
        createdEventFromSocket,
        addLocalStream,
        joinedEventFromSocket,
        closeCamera

    ));

window.store = store;
export default store;

// store.dispatch({ type: 'CREATED_EVENT_FROM_SOCKET' });