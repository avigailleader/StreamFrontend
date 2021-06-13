import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../redux/actions/action';
import './video.css'
const StartVideo = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const roomId = useSelector(state => state.convarsetionReducer.roomId)
    const countParticipantInConversion = useSelector(state => state.generalReducer.countParticipantInConversion)
    const localStream = useSelector(state => state.socketReducer.localStream)
    debugger
    const localStreamRef = useRef()
    console.log(localStreamRef);

    // const videoel=document.getElementById("localVideo")
    // useEffect(() => {

    //     let room
    //     if (window.location.pathname === '/') {
    //         room = Math.random(10).toString(36).substring(7);
    //         console.log(room);
    //         dispatch(actions.setRoomId(room))
    //         socket.emit('create', { room });
    //         // socket.emit('join', { room })
    //         dispatch(actions.setStreamConstraints({ "video": true, "audio": true }))

    //     }
    //     else {
    //         debugger
    //         dispatch(actions.setStreamConstraints({ "video": false, "audio": false }))
    //         dispatch(actions.setConnectionUserModal(true))
    //         debugger
    //         let room = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
    //         console.log(room);
    //         dispatch(actions.setRoomId(room))
    //         socket.emit('join', { room });

    //     }



    //     //הגדרת הארועים מהשרת
    //     socket.on('created', event => dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', payload: event }));
    //     console.log(localStream);
    //     // setLocallVideoRef(localStream.curr)
    //     socket.on('joined', event => { dispatch({ type: 'JOINED_EVENT_FROM_SOCKET', payload: event }) });
    //     // socket.on('candidate', event => socketService.candidateEventFromSocket(event));
    //     // socket.on('ready', event => { dispatch({ type: 'READY_EVENT_FROM_SOCKET', payload: event }) });
    //     // socket.on('offer', event => dispatch({ type: 'OFFER_EVENT_FROM_SOCKET', payload: event }));
    //     // socket.on('answer', event => socketService.answerEventFromSocket(event));
    //     // socket.on('initReceive', socketId => dispatch({ type: 'INITRECEIVE_EVENT_FROM_SOCKET', payload: socketId }));
    //     // socket.on('initSend', socketId => dispatch({ type: 'INITSEND_EVENT_FROM_SOCKET', payload: socketId }));
    //     // socket.on('toggleAudio', event => socketService.toggleAudioEventFromSocket(event));
    //     // socket.on('toggleVideo', event => dispatch({ type: 'TOGGLE_VIDEO_EVENT_FROM_SOCKET', payload: event }));
    //     // socket.on('userJoind', event => showVideo(event));

    // }, []);
    const StartVideo = () => {


        let room
        if (window.location.pathname === '/') {
            room = Math.random(10).toString(36).substring(7);
            console.log(room);
            dispatch(actions.setRoomId(room))
            socket.emit('create', { room });
            // socket.emit('join', { room })
            dispatch(actions.setStreamConstraints({ "video": true, "audio": true }))

        }
        else {
            debugger
            dispatch(actions.setStreamConstraints({ "video": false, "audio": false }))
            dispatch(actions.setConnectionUserModal(true))
            debugger
            let room = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
            console.log(room);
            dispatch(actions.setRoomId(room))
            socket.emit('join', { room });

        }



        //הגדרת הארועים מהשרת
        socket.on('created', event => dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', payload: event }));
        console.log(localStream);
        // setLocallVideoRef(localStream.curr)
        socket.on('joined', event => { dispatch({ type: 'JOINED_EVENT_FROM_SOCKET', payload: event }) });
        // socket.on('candidate', event => socketService.candidateEventFromSocket(event));
        // socket.on('ready', event => { dispatch({ type: 'READY_EVENT_FROM_SOCKET', payload: event }) });
        // socket.on('offer', event => dispatch({ type: 'OFFER_EVENT_FROM_SOCKET', payload: event }));
        // socket.on('answer', event => socketService.answerEventFromSocket(event));
        // socket.on('initReceive', socketId => dispatch({ type: 'INITRECEIVE_EVENT_FROM_SOCKET', payload: socketId }));
        // socket.on('initSend', socketId => dispatch({ type: 'INITSEND_EVENT_FROM_SOCKET', payload: socketId }));
        // socket.on('toggleAudio', event => socketService.toggleAudioEventFromSocket(event));
        // socket.on('toggleVideo', event => dispatch({ type: 'TOGGLE_VIDEO_EVENT_FROM_SOCKET', payload: event }));
        // socket.on('userJoind', event => showVideo(event));

    }
    useEffect(() => {
        debugger
        localStreamRef.current.srcObject = localStream.srcObject
        console.log(localStreamRef);

    }, [localStream])
    return (
        <div>
            {/* id="localVideo" */}
            <button onClick={e => { StartVideo() }}>click me!!!!!!!!!!!<video id="localVideo" height="100%" width="100%" autoPlay ref={localStreamRef} ></video></button>

        </div>
    )
}

export default StartVideo