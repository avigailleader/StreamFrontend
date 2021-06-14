import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../redux/actions/action';
import './video.css'
const Stream = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const roomId = useSelector(state => state.convarsetionReducer.roomId)
    const countParticipantInConversion = useSelector(state => state.generalReducer.countParticipantInConversion)
    const localStream = useSelector(state => state.socketReducer.localStream)
    debugger
    const localStreamRef = useRef()
    console.log(localStreamRef);
    let room
    useEffect(() => {
        debugger
        let room = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);

        if (window.location.href.includes(`${roomId}`)) {
            debugger
            dispatch(actions.setStreamConstraints({ "video": false, "audio": false }))
            dispatch(actions.setConnectionUserModal(true))
            debugger
            console.log(roomId);
            dispatch(actions.setRoomId(roomId))
            socket.emit('join', { roomId });

        }

    }, [])

    const StartVideo = async () => {


        if (window.location.pathname === '/') {
            room = Math.random(10).toString(36).substring(7);
            console.log(room);
            dispatch(actions.setRoomId(room))
            dispatch(actions.setStreamConstraints({ "video": true, "audio": true }))
            socket.emit('create', { room });
            console.log(localStream);

        }
        socket.on('created', event => dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', payload: event }));


    }
    useEffect(() => {
        debugger
        localStreamRef.current.srcObject = localStream.srcObject
        console.log(localStreamRef);
    }, [localStream])
    const isMuted = () => {
    }
    return (
        <div>
            {window.location.pathname === '/' ?
                <button onClick={e => { StartVideo() }}>click me!!!!!!!!!!!<video id="localVideo" height="100%" width="100%" muted autoPlay ref={localStreamRef} ></video>
                </button> :
                <video id="localVideo" height="100%" width="100%" autoPlay ref={localStreamRef} ></video>
            }
        </div>
    )
}

export default Stream