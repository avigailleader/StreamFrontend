import produce from 'immer';

import createReducer from './reducerUtils';

const initialState = {
    connectionUserModel: false,

}

const convarsetionData = {

    setRoomId(state, action) {
        debugger
        state.roomId = action.payload;
    },
    setConnectionUserModal(state, action) {
        state.connectionUserModel = action.payload;
    },

}

export default produce((state, action) => createReducer(state, action, convarsetionData), initialState);