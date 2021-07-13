import produce from 'immer';

import createReducer from './reducerUtils';

const initialState = {

    roomId: '',
    isCaller: false,
    localVideoStatus: true,
    remoteVideoStatus: true,
    connectionUserModel: true,
    cameraStatus: false,
    microphoneStatus: false,
    receiveMessageToAll: {},
    videoLiveName: " ",
    date: " ",
    length: " ",
    url: " ",
    description: "my video"

}

const convarsetionData = {
    setVideoLiveName(state, action) {
        state.videoLiveName = action.payload;
    },
    setUrl(state, action) {
        state.url = action.payload;

    },
    setDescription(state, action) {
        state.description = action.payload;
    },
    setLength(state, action) {
        debugger
        state.length = action.payload
    },
    setRoomId(state, action) {

        state.roomId = action.payload;
    },
    setConnectionUserModal(state, action) {
        state.connectionUserModel = action.payload;
    },
    setIsCaller(state, action) {
        state.isCaller = action.payload;
    },
    setLocalVideoStatus(state, action) {
        state.localVideoStatus = action.payload;
    },
    setRemoteVideoStatus(state, action) {
        state.remoteVideoStatus = action.payload;
    },
    setConnectionUserModal(state, action) {
        state.connectionUserModal = action.connectionUserModal;
    },
    setCameraStatus(state, action) {
        state.cameraStatus = action.payload;
    },
    setMicrophoneStatus(state, action) {
        state.microphoneStatus = action.payload;
    },
    setReceiveMessageToAll(state, action) {
        state.receiveMessageToAll = action.payload;
    }

}

export default produce((state, action) => createReducer(state, action, convarsetionData), initialState);