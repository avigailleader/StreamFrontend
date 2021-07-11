import axios from 'axios';
import env from "../../config/env/dev"

// import moment from 'moment'

import { actions } from '../actions/action';

const closeCamera = ({ dispatch, getState }) => next => action => {
    debugger
    if (action.type === 'CLOSE_CAMERA') {
        debugger
        navigator.mediaDevices
            .getUserMedia({ "video": true, "audio": true })
            .then(function (stream) {
                // dispatch({ type: 'ADD_LOCAL_STREAM', payload: stream });
                stream.stop()
                alert("the camera closed")
            })
            .catch(function (err) {
                console.log(err);
                if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                    console.log("required track is missing");
                } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
                    console.log("webcam or mic are already in use");
                } else if (err.name === "OverconstrainedError" || err.name === "ConstraintNotSatisfiedError") {
                    console.log("constraints can not be satisfied by avb. devices");
                } else if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                    console.log("permission denied in browser");
                } else if (err.name === "TypeError" || err.name === "TypeError") {
                    console.log("empty constraints object");
                } else {
                    console.log("other errors");
                }
            });
    }
    return next(action);
}

//TODO save cuurent user that join to the conversation.
const joinedEventFromSocket = ({ dispatch, getState }) => next => action => {

    if (action.type === 'JOINED_EVENT_FROM_SOCKET') {

        navigator.mediaDevices
            .getUserMedia(getState().socketReducer.streamConstraints)
            .then(function (stream) {
                dispatch(actions.addLocalStream(stream));
                dispatch(actions.setVisibleOptionsModal(true));

            })
            .catch(function (err) {
                console.log(err);
                if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                    console.log("required track is missing");
                } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
                    console.log("webcam or mic are already in use");
                } else if (err.name === "OverconstrainedError" || err.name === "ConstraintNotSatisfiedError") {
                    console.log("constraints can not be satisfied by avb. devices");
                } else if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                    console.log("permission denied in browser");
                } else if (err.name === "TypeError" || err.name === "TypeError") {
                    console.log("empty constraints object");
                } else {
                    console.log("other errors");
                }
            });
    }
    return next(action)
}

const saveVideo = ({ dispatch, getState }) => next => action => {
    debugger
    if (action.type === 'SAVE_VIDEO') {
        let jsonObject = {
            videoLiveName: getState().convarsetionReducer.videoLiveName,
            date: new Date(Date.now()),
            length: getState().convarsetionReducer.length,
            url: getState().convarsetionReducer.url,
            userName: getState().userReducer.userName
        }
        axios.post(env.BASE_URL + `api/:${getState().userReducer.userName}/createVideo`, jsonObject)
            .then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })

    }
    return next(action)

}


export {

    joinedEventFromSocket,
    closeCamera,
    saveVideo

}
