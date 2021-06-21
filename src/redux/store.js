import { createStore, combineReducers, applyMiddleware } from 'redux';

import recordReducer from './reducers/record.reducer';
import socketReducer from './reducers/socket.reducer'
import convarsetionReducer from './reducers/convarsetion.reducer'
import generalReducer from '../components/video/general.reducer'
import userReducer from './reducers/user.reducer'

import {
    joinedEventFromSocket,
    createdEventFromSocket,
    addLocalStream,


} from './middlewares/crud';

const reducer = combineReducers({
    recordReducer,
    socketReducer,
    convarsetionReducer,
    generalReducer,
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