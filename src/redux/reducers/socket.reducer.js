import produce from 'immer';
import io from "socket.io-client";

import createReducer from './reducerUtils';

const initialState = {
    socket: io.connect('https://stream.vlogger.codes/', {
        transports: ['websocket']
    }),
    localStream: "",
    streamConstraints: { "video": true, "audio": true },

}
const socketData = {
    setLocalStream(state, action) {

        state.localStream = action.payload;
    },
    setStreamConstraints(state, action) {

        state.streamConstraints = action.payload;
    }
}



export default produce((state, action) => createReducer(state, action, socketData), initialState);