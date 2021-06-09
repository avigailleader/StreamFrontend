import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../redux/actions/action';
const StartVideo = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const roomId = useSelector(state => state.convarsetionReducer.roomId)
    const countParticipantInConversion = useSelector(state => state.generalReducer.countParticipantInConversion)

    debugger
    useEffect(() => {
        let room = Math.random(10).toString(36).substring(7);
        dispatch(actions.setRoomId(room))
        socket.emit('create', { room });
        socket.emit('join', { room })


        //הגדרת הארועים מהשרת
        socket.on('created', event => dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', payload: event }));
        // socket.on('joined', event => { dispatch({ type: 'JOINED_EVENT_FROM_SOCKET', payload: event }) });
        // socket.on('candidate', event => socketService.candidateEventFromSocket(event));
        // socket.on('ready', event => { dispatch({ type: 'READY_EVENT_FROM_SOCKET', payload: event }) });
        // socket.on('offer', event => dispatch({ type: 'OFFER_EVENT_FROM_SOCKET', payload: event }));
        // socket.on('answer', event => socketService.answerEventFromSocket(event));
        // socket.on('initReceive', socketId => dispatch({ type: 'INITRECEIVE_EVENT_FROM_SOCKET', payload: socketId }));
        // socket.on('initSend', socketId => dispatch({ type: 'INITSEND_EVENT_FROM_SOCKET', payload: socketId }));
        // socket.on('toggleAudio', event => socketService.toggleAudioEventFromSocket(event));
        // socket.on('toggleVideo', event => dispatch({ type: 'TOGGLE_VIDEO_EVENT_FROM_SOCKET', payload: event }));
        // socket.on('userJoind', event => showVideo(event));

    }, []);
    return (
        <div>
            <video id="localVideo" autoPlay ></video>
        </div>
    )
}

export default StartVideo
