import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../redux/actions/action';
import './video.css'
const Video = (props) => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const userName = useSelector(state => state.userReducer.userName)
    const countParticipantInConversion = useSelector(state => state.generalReducer.countParticipantInConversion)
    const localStream = useSelector(state => state.socketReducer.localStream)

    const localStreamRef = useRef()
    const { history } = props;
    let room
    useEffect(() => {
        let userName = ""
        if (window.location.href.includes("admin"))
            userName = window.location.pathname.split("/")[2];
        else
            userName = window.location.pathname.split("/")[1];
        console.log("username!! " + userName)
        dispatch(actions.setUserName(userName))
        if (!window.location.href.includes("admin")) {
            dispatch(actions.setStreamConstraints({ "video": false, "audio": false }))
            dispatch(actions.setConnectionUserModal(true))
            room = userName
            socket.emit('join', { room });
            // socket.on('joined', event => dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', payload: event }));
            socket.on('not exist room', () => { history.push('/notExist') });
            socket.on('joined', () => { alert("joined successfully to " + room) });
        }

    }, [])

    const StartVideo = async () => {


        if (window.location.href.includes("admin")) {
            room = userName
            dispatch(actions.setStreamConstraints({ "video": true, "audio": true }))
            socket.emit('create', { room });
        }
        socket.on('created', event => dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', payload: event }));


    }
    useEffect(() => {

        localStreamRef.current.srcObject = localStream.srcObject
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

export default Video