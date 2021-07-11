import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../redux/actions/action';
import './video.css'
import pouse from "../../assets/Group 21662.svg"
import play from "../../assets/Component 719 – 5.svg"
import playDark from "../../assets/Group 21705.svg"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios'
import env from "../../config/env/dev"

import { useStopwatch } from 'react-timer-hook';
const Video = (props) => {
    const [displayVideo, setDisplayVideo] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [isStart1, setIsStart1] = useState(false);

    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const streamConstraints = useSelector(state => state.socketReducer.streamConstraints)
    const receiveToAll = useSelector(state => state.convarsetionReducer.receiveMessageToAll)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const userName = useSelector(state => state.userReducer.userName)
    const localStream = useSelector(state => state.socketReducer.localStream)
    const localStreamRef = useRef()

    const { history } = props;
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        reset,
        pause,
    } = useStopwatch({ autoStart: true });

    let room
    let anim = useRef()
    let time = useRef()
    setInterval(() => { }, 1000)
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
    const openCamera = () => {
        dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', });
        start(true)

    }

    const stopStreamedVideo = () => {
        pause()
        debugger
        const stream = localStreamRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });
    }
    function createPeer() {
        debugger
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"

                    // urls: "stun:stun.1.google.com:19302"
                }
            ]
        });
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

        return peer;
    }

    async function handleNegotiationNeededEvent(peer) {
        debugger
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        const payload = {
            sdp: peer.localDescription
        };

        const { data } = await axios.post(env.BASE_URL + 'broadcast', payload);
        const desc = new RTCSessionDescription(data.sdp);
        peer.setRemoteDescription(desc).catch(e => console.log(e));
    }
    const startStream = async () => {
        debugger
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        dispatch(actions.setLocalStream(stream))
        localStreamRef.current.srcObject = stream;
        console.log(stream);
        const peer = createPeer();
        stream.getTracks().forEach(track => peer.addTrack(track, stream));
    }
    useEffect(() => {
        setDisplayVideo(true)
        let userName = ""
        if (window.location.href.includes("admin")) {
            userName = window.location.pathname.split("/")[2];
            startStream()

        }
        console.log("username!! " + userName)
        dispatch(actions.setUserName(userName))
        socket.on('receive-message-to-all', message => {
            console.log("receive-message-to-all " + message);
            dispatch(actions.setReceiveMessageToAll(message))
            // alert(message);
        });
    }, [])

    const StartVideo = async () => {

        if (window.location.href.includes("admin")) {
            room = userName
            // dispatch(actions.setStreamConstraints({ "video": true, "audio": true }))
            socket.emit('create', { room });
        }
        socket.on('created', room)
        setIsStart(true)
        setIsStart1(true)
    }


    // הקלטה
    let mediaRecorder;
    let recordedBlobs;
    let btnVideo = useRef()
    let downloadButton = useRef()
    let status = true

    useEffect(() => {
        if (isStart && isStart1)
            clickRecord()
    }, [isStart])
    const clickRecord = async () => {

        if (status) {
            startRecording();
            status = !status
            btnVideo.current.src = pouse
        } else {
            stopRecording();
            pause()
            btnVideo.current.src = play
            downloadButton.current.disabled = false;
            status = !status
        }
    }

    const stopRecording = () => {
        mediaRecorder.stop();
        anim.current.style.display = 'none';
        // להפעיל פונקציה שעוצרת את השעון
        setIsStart(false);

    }
    const startRecording = () => {
        start()
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

        anim.current.style.display = 'inline-block';
        time.current.style.display = 'inline-block';

    }
    // דוחף למערך סטרימים
    const handleDataAvailable = (event) => {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }
    // להורדה
    const clickDownload = () => {

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
                    <div className="col-12">
                        <div className="diVideo">
                            <video id="localVideo" height="100%" width="100%" muted={true} autoPlay ref={localStreamRef} >
                            </video>

                        </div>

                        <p class="blink_me oStyle styleA" ref={anim} >o</p>
                        <p className="styleB" ref={time}> <span >{h1}</span>:<span>{m1}</span>:<span>{s1}</span></p>

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

                </div>
            </div>

            <Button variant="danger" onClick={(e) => { stopStreamedVideo(localStreamRef) }}>close camera</Button>
            <Button variant="danger" onClick={(e) => { openCamera() }}>close camera</Button>

        </>
    )
}
export default Video
