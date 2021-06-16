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

    const localStreamRef = useRef()
    console.log(localStreamRef);
    let userName
    useEffect(() => {

        let userName = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);

        if (!window.location.href.includes("admin")) {

            dispatch(actions.setStreamConstraints({ "video": false, "audio": false }))
            dispatch(actions.setConnectionUserModal(true))

            console.log(userName);
            dispatch(actions.setRoomId(userName))
            socket.emit('join', { userName });

        }

    }, [])

    const StartVideo = async () => {


        if (window.location.href.includes("admin")) {
            debugger
            userName = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
            debugger
            console.log(userName);
            dispatch(actions.setRoomId(userName))
            dispatch(actions.setStreamConstraints({ "video": true, "audio": true }))
            socket.emit('create', { userName });
            console.log(localStream);
            socket.emit('setStream', { localStream });


        }
        socket.on('created', event => dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', payload: event }));


    }
    useEffect(() => {

        localStreamRef.current.srcObject = localStream.srcObject
        console.log(localStreamRef);
    }, [localStream])
    const isMuted = () => {
        debugger
        if (window.location.href.includes("admin"))
            return true;
        return false
    }
    return (
        <div>
            {window.location.href.includes("admin") ?
                <button onClick={e => { StartVideo() }}>click me!!!!!!!!!!!
                    <video id="localVideo" height="100%" width="100%" muted={isMuted()} autoPlay ref={localStreamRef} >
                    </video>
                </button> :
                <video id="localVideo" muted={isMuted()} height="100%" width="100%" autoPlay ref={localStreamRef} ></video>
            }
        </div>
    )
}

export default Stream