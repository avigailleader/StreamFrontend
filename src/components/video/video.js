import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../redux/actions/action';
import './video.css'

const Video = (props) => {
    const [displayVideo, setDisplayVideo] = useState(false);
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
        setDisplayVideo(true)

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

        if (window.location.href.includes("admin"))
            return true;
        return false
    }


    // הקלטה
    let mediaRecorder;
    let recordedBlobs;

    let startBtnRef = useRef()
    let checkStart = useRef()
    let errorMsgElementRef = useRef()
    let downloadButton = useRef()
    let gumVideo = useRef()
    function clickRecord() {

        if (startBtnRef.current.textContent === 'Start Recording') {
            startRecording();
        } else {
            stopRecording();
            startBtnRef.current.textContent = 'Start Recording';
            downloadButton.current.disabled = false;
        }
    }
    function stopRecording() {
        mediaRecorder.stop();
    }
    function startRecording() {
        recordedBlobs = [];
        try {
            mediaRecorder = new MediaRecorder(window.store.getState().socketReducer.localStream, { mimeType: "video/webm;codecs=vp9,opus" });//window.stream, options);
        } catch (e0) {
            console.log('Unable to create MediaRecorder with options Object: ', { mimeType: "video/webm;codecs=vp9,opus" }, e0);
            try {
                mediaRecorder = new MediaRecorder(window.store.getState().socketReducer.localStream, { mimeType: 'video/webm;codecs=vp8' });
            } catch (e1) {
                console.log('Unable to create MediaRecorder with options Object: ', { mimeType: 'video/webm;codecs=vp8' }, e1);
                try {
                    mediaRecorder = new MediaRecorder(window.store.getState().socketReducer.localStream, 'video/mp4');
                } catch (e2) {
                    alert('MediaRecorder is not supported by this browser.');
                    console.error('Exception while creating MediaRecorder:', e2);
                    return;
                }
            }

        }
        console.log('Created MediaRecorder', mediaRecorder, 'with options', { mimeType: "video/webm;codecs=vp9,opus" });
        startBtnRef.current.textContent = 'Stop Recording';
        downloadButton.current.disabled = true;
        mediaRecorder.onstop = (event) => {
            console.log('Recorder stopped: ', event);
            console.log('Recorded Blobs: ', recordedBlobs);
        };
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
        console.log('MediaRecorder started', mediaRecorder);
    }
    // דוחף למערך סטרימים
    function handleDataAvailable(event) {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }
    // להורדה
    function clickDownload() {

        const blob = new Blob(recordedBlobs, { type: 'video/webm' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'test.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
    // להורדה
    function clickDownload() {
        debugger
        const blob = new Blob(recordedBlobs, { type: 'video/webm' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'test.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
    return (
        <div>
            {window.location.href.includes("admin") ? <div style={{ backgroundColor: 'red', position: "relative" }}>
                <button onClick={e => { StartVideo() }}>click me!!!!!!!!!!!</button>
                <video id="localVideo" height="200px" width="200px" muted={isMuted()} autoPlay ref={localStreamRef} >
                </video>
                <video id="gum" playsInline autoPlay muted ref={gumVideo}></video>

                <label>errorMsgElement</label> <span id="errorMsgElement" ref={errorMsgElementRef}></span>
                <button onClick={clickRecord} ref={startBtnRef}>Start Recording</button>
                <button id="download" onClick={clickDownload} ref={downloadButton}>Download</button>

                <p>start record:<input type="checkbox" id="echoCancellation" ref={checkStart}></input></p>
            </div>
                :
                <video id="localVideo" muted={isMuted()} height="100px" width="100px" autoPlay ref={localStreamRef} ></video>
            }
        </div>
    )
}

export default Video
