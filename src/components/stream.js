import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../redux/actions/action';
import './video.css'

const Stream = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const userName = useSelector(state => state.userReducer.userName)
    const countParticipantInConversion = useSelector(state => state.generalReducer.countParticipantInConversion)
    const localStream = useSelector(state => state.socketReducer.localStream)

    const localStreamRef = useRef()
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

        }

    }, [])

    const StartVideo = async () => {
        debugger

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


    // הקלטה
    let mediaRecorder;
    let recordedBlobs;


    let startBtnRef = useRef()
    let checkStart = useRef()
    let codecPreferences = useRef()
    let errorMsgElementRef = useRef()
    let playButton = useRef()
    let downloadButton = useRef()
    let gumVideo = useRef()
    function clickRecord() {
        debugger
        if (startBtnRef.current.textContent === 'Start Recording') {
            startRecording();
        } else {
            stopRecording();
            startBtnRef.current.textContent = 'Start Recording';
            playButton.current.disabled = false;
            downloadButton.current.disabled = false;
            codecPreferences.current.disabled = false;
        }
    }
    function stopRecording() {
        mediaRecorder.stop();
    }
    // קוד עשוי
    function startRecording() {
        debugger
        startBtnRef.current.disabled = true;
        const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
        const constraints = {
            audio: {
                echoCancellation: { exact: hasEchoCancellation }
            },
            video: {
                width: 1280, height: 720
            }
        }
        console.log('Using media constraints:', constraints);
        init(constraints);
    }
    // קוד עשוי
    function init(constraints) {
        try {
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                handleSuccess(stream);
            });

        } catch (e) {
            console.error('navigator.getUserMedia error:', e);
            errorMsgElementRef.current.html = `navigator.getUserMedia error:${e.toString()}`;
        }
    }


    function startRecording() {
        recordedBlobs = [];
        // const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
        // const options = { mimeType };
        let options = { mimeType: 'video/webm;codecs=vp9', bitsPerSecond: 100000 };
        try {
            mediaRecorder = new MediaRecorder(window.store.getState().socketReducer.localStream, options);//window.stream, options);
        } catch (e0) {
            console.log('Unable to create MediaRecorder with options Object: ', options, e0);
            try {
                options = { mimeType: 'video/webm;codecs=vp8', bitsPerSecond: 100000 };
                mediaRecorder = new MediaRecorder(window.store.getState().socketReducer.localStream, options);
            } catch (e1) {
                console.log('Unable to create MediaRecorder with options Object: ', options, e1);
                try {
                    options = 'video/mp4';
                    mediaRecorder = new MediaRecorder(window.store.getState().socketReducer.localStream, options);
                } catch (e2) {
                    alert('MediaRecorder is not supported by this browser.');
                    console.error('Exception while creating MediaRecorder:', e2);
                    return;
                }
            }

        }
    

            console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
            startBtnRef.current.textContent = 'Stop Recording';
            playButton.current.disabled = true;
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

        // קוד עשוי
        function getSupportedMimeTypes() {
            const possibleTypes = [
                'video/webm;codecs=vp9,opus',
                'video/webm;codecs=vp8,opus',
                'video/webm;codecs=h264,opus',
                'video/mp4;codecs=h264,aac',
            ];
            return possibleTypes.filter(mimeType => {
                return MediaRecorder.isTypeSupported(mimeType);
            });
        }
        function handleSuccess(stream) {
            startBtnRef.current.disabled = false;
            console.log('getUserMedia() got stream:', stream);
            window.stream = stream;

            gumVideo.current.srcObject = stream;

            getSupportedMimeTypes().forEach(mimeType => {
                const option = document.createElement('option');
                option.value = mimeType;
                option.innerText = option.value;
                codecPreferences.current.appendChild(option);
            });
            codecPreferences.current.disabled = false;
        }

        return (
            <div>
                {window.location.href.includes("admin") ? <div>
                    <button onClick={e => { StartVideo() }}>click me!!!!!!!!!!!
                        <video id="localVideo" height="100%" width="100%" muted={isMuted()} autoPlay ref={localStreamRef} >
                        </video></button>
                    <video id="gum" playsinline autoplay muted ref={gumVideo}></video>

                    {/* <label>codecPreferences</label> <span id="codecPreferences" ref={codecPreferences}></span> */}
                    <label>errorMsgElement</label> <span id="errorMsgElement" ref={errorMsgElementRef}></span>
                    <button onClick={clickRecord} ref={startBtnRef}>Start Recording</button>
                    <button id="play" disabled ref={playButton} >Play</button>
                    <button id="download" disabled ref={downloadButton}>Download</button>
                    <p>start record:<input type="checkbox" id="echoCancellation" ref={checkStart}></input></p>
                </div>
                    :
                    <video id="localVideo" muted={isMuted()} height="100%" width="100%" autoPlay ref={localStreamRef} ></video>
                }
                {/* <video id="gum" playsinline autoplay muted ref={gumVideo}></video>

                    <label>codecPreferences</label> <span id="codecPreferences" ref={codecPreferences}></span>
                    <label>errorMsgElement</label> <span id="errorMsgElement" ref={errorMsgElementRef}></span>
                    <button onClick={clickRecord} ref={startBtnRef}>Start Recording</button>
                    <button id="play" disabled ref={playButton} >Play</button>
                    <button id="download" disabled ref={downloadButton}>Download</button>
                    <p>start record:<input type="checkbox" id="echoCancellation" ref={checkStart}></input></p> */}


            </div>
        )
    }

    export default Stream