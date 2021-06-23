import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../redux/actions/action';
import './video.css'
import pouse from "../../assets/Group 21662.svg"
import play from "../../assets/Component 719 – 5.svg"
import playDark from "../../assets/Group 21705.svg"
const Video = (props) => {
    const [displayVideo, setDisplayVideo] = useState(false);
    const [isStart,setIsStart]=useState(false);
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const userName = useSelector(state => state.userReducer.userName)
    const localStream = useSelector(state => state.socketReducer.localStream)
    const localStreamRef = useRef()
    const { history } = props;
    let room
    let anim = useRef()

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
    let status = true

    useEffect(() => {
        if(isStart){
             clickRecord()
          
        }
       
    }, [isStart])
    const clickRecord = async () => {
        debugger
        if (status) {
            startRecording();
            status = !status
            btnVideo.current.src = pouse
        } else {
            stopRecording();
            btnVideo.current.src = play
            downloadButton.current.disabled = false;
             status=!status
        }
    }
    function stopRecording() {
        mediaRecorder.stop();
        anim.current.style.display='none';
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
       anim.current.style.display='inline-block';
       
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

                            <div className="underDiv">
                                <img src={play} ref={btnVideo} className="imgPlayPouse" onClick={!isStart? e => StartVideo():e=>clickRecord()}
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



        </>
    )
}

export default Video
