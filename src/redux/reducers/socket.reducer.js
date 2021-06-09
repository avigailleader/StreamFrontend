import produce from 'immer';
import io from "socket.io-client";

import createReducer from './reducerUtils';

const initialState = {
    socket: io.connect('https://stream.vlogger.codes/', {
        transports: ['websocket']
    }),

}
const socketData = {

}



export default produce((state, action) => createReducer(state, action, socketData), initialState);