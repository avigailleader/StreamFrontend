import { createStore, combineReducers, applyMiddleware } from 'redux';

import recordReducer from './reducers/record.reducer';
import {
    createdEventFromSocket,
} from './middlewares/crud';

const reducer = combineReducers({
    recordReducer
});

const store = createStore(
    reducer,
    applyMiddleware(
        createdEventFromSocket,
    ));

window.store = store;
export default store;

store.dispatch({ type: 'CREATED_EVENT_FROM_SOCKET' });