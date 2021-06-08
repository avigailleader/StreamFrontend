import axios from 'axios';
// import moment from 'moment'

import { actions } from '../actions/action';

const createdEventFromSocket = ({ dispatch, getState }) => next => action => {
    debugger
    if (action.type === 'CREATED_EVENT_FROM_SOCKET') {
        debugger
        navigator.mediaDevices
            .getUserMedia({

                audio: true,
                video: { width: 1280, height: 720 }

            })
            .then(function (stream) {
                dispatch({ type: 'ADD_LOCAL_STREAM', payload: stream });
                dispatch(actions.setIsCaller(true));
                // crud.addNewConversation();
                dispatch({ type: 'ADD_NEW_CONVERSATION' });

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

export {
    createdEventFromSocket
}