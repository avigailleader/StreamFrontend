import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../redux/actions/action';
import './video.css'
import pouse from "../../assets/Group 21662.svg"
import play from "../../assets/Component 719 – 5.svg"
import playDark from "../../assets/Group 21705.svg"
import { useStopwatch } from 'react-timer-hook';
const Video = (props) => {
    const [displayVideo, setDisplayVideo] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const streamConstraints = useSelector(state => state.socketReducer.streamConstraints)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const userName = useSelector(state => state.userReducer.userName)
    const localStream = useSelector(state => state.socketReducer.localStream)
    const localStreamRef = useRef()
    const { history } = props;
    const {
        seconds,
        minutes,
        hours,
        start,
        pause,
    } = useStopwatch({ autoStart: true });

    let room
    let anim = useRef()

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        }
        else {
            return valString;
        }
    }
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        let difference = +new Date(`10/01/${year}`) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                // seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;

    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


    var h1, m1, s1;
    if (seconds < 10) {
        s1 = '0' + seconds
    }
    else {
        s1 = seconds
    }
    if (minutes < 10) {
        m1 = '0' + minutes
    }
    else {
        m1 = minutes
    }
    if (hours < 10) {
        h1 = '0' + hours
    }
    else {
        h1 = hours
    }
    useEffect(() => {
        setDisplayVideo(true)
        let userName = ""
        if (window.location.href.includes("admin")) {
            userName = window.location.pathname.split("/")[2];
        }
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
        else {
            dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', });

        }
        socket.on('receive-message-to-all', message => {
            console.log("receive-message-to-all " + message);
            alert(message);
        });
    }, [])

    const StartVideo = async () => {
        debugger
        if (window.location.href.includes("admin")) {
            room = userName
            dispatch(actions.setStreamConstraints({ "video": true, "audio": true }))
            socket.emit('create', { room });
        }

        socket.on('created', room)
        setIsStart(true)
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
    let btnVideo = useRef()
    let startBtnRef = useRef()
    let checkStart = useRef()
    let downloadButton = useRef()
    let gumVideo = useRef()
    let status = true

    useEffect(() => {
        if (isStart)
            clickRecord()
    }, [isStart])
    const closeCamera = () => {
        debugger
        console.log("vhgvwvcjdkbkj");
        // dispatch({ type: 'CLOSE_CAMERA', });

        dispatch(actions.setStreamConstraints({ "video": false, "audio": true }))
        dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', });
    }
    function clickRecord() {

        if (status) {
            startRecording();
            status = !status
        } else {
            stopRecording();
            btnVideo.current.src = play
            downloadButton.current.disabled = false;
            status = !status
        }
    }

    function stopRecording() {
        mediaRecorder.stop();
        anim.current.style.display = 'none';
        // setIsStart(false);
    }
    function startRecording() {
        debugger
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
        downloadButton.current.disabled = true;
        mediaRecorder.onstop = (event) => {
            console.log('Recorder stopped: ', event);
            console.log('Recorded Blobs: ', recordedBlobs);
        };
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
        console.log('MediaRecorder started', mediaRecorder);
        debugger
        anim.current.style.display = 'inline-block';

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
        <>
            {/* <div className="diVideo"> */}
            <div className="container">
                <div className="row">

                    {window.location.href.includes("admin") ?

                        <div className="col-12">
                            <div className="diVideo">
                                <video id="localVideo" height="100%" width="100%" muted={true} autoPlay ref={localStreamRef} >
                                </video>

                            </div>
                            <p class="blink_me oStyle styleA" ref={anim} >o</p>
                            <div class="blink_me oStyle styleA">
                                <span >{h1}</span>:<span>{m1}</span>:<span>{s1}</span>
                            </div>

                            <div className="underDiv">
                                <img src={play} ref={btnVideo} className="imgPlayPouse" onClick={!isStart ? e => StartVideo() : e => clickRecord()}
                                //  onMouseOver={e => { (e.currentTarget.src = playDark) }}
                                // onMouseOut={e => (e.currentTarget.src = play)}
                                >
                                </img>
                                {/* <button onClick={e => StartVideo()} ref={startBtnRef}>start stream</button> */}
                                <button id="download" onClick={clickDownload} ref={downloadButton}>Download</button>
                                <p class="live">Live</p>
                            </div>
                        </div>


                        :
                        <video id="localVideo" muted={isMuted()} height="100px" width="100px" autoPlay ref={localStreamRef} ></video>
                    }</div>
            </div>
            <button onClick={(e) => { closeCamera() }}>close camera</button>

        </>
    )
}

export default Video
