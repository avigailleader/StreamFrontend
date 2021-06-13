import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../redux/actions/action';
import './video.css'
const Viewers = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const roomId = useSelector(state => state.convarsetionReducer.roomId)
    const countParticipantInConversion = useSelector(state => state.generalReducer.countParticipantInConversion)
    const localStream = useSelector(state => state.socketReducer.localStream)
    debugger
    const localStreamRef = useRef()
    console.log(localStreamRef);

    useEffect(() => {
        debugger
        let room = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);

        if (window.location.href.includes(`${room}`)) {
            debugger
            dispatch(actions.setStreamConstraints({ "video": true, "audio": false }))
            dispatch(actions.setConnectionUserModal(true))
            debugger
            console.log(room);
            dispatch(actions.setRoomId(room))
            socket.emit('join', { room });

        }
        socket.on('joined', event => { dispatch({ type: 'JOINED_EVENT_FROM_SOCKET', payload: event }) });

    }, [])
    useEffect(() => {
        debugger
        localStreamRef.current.srcObject = localStream.srcObject
        console.log(localStreamRef);

    }, [localStream])
    return (
        <div>
            <video id="localVideo" height="100%" width="100%" autoPlay ref={localStreamRef} ></video>
        </div>
    )
}

export default Viewers