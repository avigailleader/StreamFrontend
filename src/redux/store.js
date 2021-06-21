import { createStore, combineReducers, applyMiddleware } from 'redux';

import recordReducer from './reducers/record.reducer';
import socketReducer from './reducers/socket.reducer'
import convarsetionReducer from './reducers/convarsetion.reducer'
import userReducer from './reducers/user.reducer'

import {
<<<<<<< HEAD
=======
    // addLocalStream,
    // createdEventFromSocket,
    // joinedEventFromSocket,

    toggleVideo,
    toggleAudio,
} from '../services/socket.service';
import {
>>>>>>> a875f324b9c8dba6a0d41102ae5b77eda3f87521
    joinedEventFromSocket,
    createdEventFromSocket,
    addLocalStream,


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
        joinedEventFromSocket

    ));

window.store = store;
export default store;

// store.dispatch({ type: 'CREATED_EVENT_FROM_SOCKET' });