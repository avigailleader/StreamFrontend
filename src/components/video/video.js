import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../redux/actions/action';
import './video.css'
import pouse from "../../assets/Group 21662.svg"
import play from "../../assets/Component 719 – 5.svg"
import playDark from "../../assets/Group 21705.svg"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import $ from 'jquery'
import { useStopwatch } from 'react-timer-hook';
import SaveVideoModle from '../modles/SaveVideoModle'
const Video = (props) => {
    const [displayVideo, setDisplayVideo] = useState(false);
    // const [isStart, setIsStart] = useState(false);

    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const streamConstraints = useSelector(state => state.socketReducer.streamConstraints)
    const receiveToAll = useSelector(state => state.convarsetionReducer.receiveMessageToAll)
    const connectionUserModel = useSelector(state => state.convarsetionReducer.connectionUserModel)
    const userName = useSelector(state => state.userReducer.userName)
    const localStream = useSelector(state => state.socketReducer.localStream)
    const [message, setMessage] = useState({})
    const [ifShow, setIfShow] = useState(false)
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
    const stopStreamedVideo = () => {
        pause()
        debugger
        const stream = localStreamRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
            track.stop();
        });

        // localStreamRef.current.srcObject = null;
    }
    const openCamera = () => {
        return new Promise((resolve, reject) => {
            dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', })
            start(true)
            resolve("camera open")
        })
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
        socket.on('receive-message-to-all', recMessage => {
            debugger
            setMessage({})
            console.log(recMessage);
            shareMessage(recMessage)
            // setMessage(message=> message['data']=recMessage)
            console.log(message['data']);
            console.log("receive-message-to-all: " + recMessage);
            setIfShow(true)
            // dispatch(actions.setReceiveMessageToAll(recMessage))
            // alert(message);
        });
    }, [])
    const shareMessage = (msg) => {
        setMessage(message['data'] = msg)

    }
    const showMessageToShare = () => {
        debugger
        let div = document.getElementById('showMessage')
        console.log(message.data);
        div.innerHTML = message.data

        console.log(div);
    }
    const StartVideo = async () => {
        // debugger רק אם נצטרך שתי הקלטות ברינדור אחד נטפל בזה
        // if (!status) {
        //     await openCamera()
        // }

        if (window.location.href.includes("admin")) {
            room = userName
            dispatch(actions.setStreamConstraints({ "video": true, "audio": true }))
            socket.emit('create', { room });
        }
        socket.on('created', room)
        setStatus(true)
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
    let btnVideo = useRef()
    let downloadButton = useRef()
    const [status, setStatus] = useState(true)
    const [isStart, setIsStart] = useState(false);
    const [mediaR, setMediaR] = useState()
    const [recordedBlobs, setRecordedBlobs] = useState([])
    const [showModal,setShowModal]=useState(false)
    useEffect(() => {
        if (mediaR) {
            console.log("mediaR:", mediaR)
            console.log('Created MediaRecorder', mediaR, 'with options', { mimeType: "video/WEBM;codecs=VP8,OPUS" });
            downloadButton.current.disabled = true;

            mediaR.onstop = (event) => {
                console.log('Recorder stopped: ', event);
                console.log('Recorded Blobs: ', recordedBlobs);
            };

            mediaR.ondataavailable = handleDataAvailable;
            try {
                mediaR.start();
            } catch (err) { console.log(err); }

            console.log('MediaRecorder started', mediaR);

            anim.current.style.display = 'inline-block';
            time.current.style.display = 'inline-block';


        }
    }, [mediaR])

    useEffect(() => {
        debugger
        if (isStart && status)
            clickRecord()
    }, [isStart])
    const clickRecord = async () => {
        debugger
        if (status) {
            startRecording();
            setStatus(false)
            setIsStart(true)
            btnVideo.current.src = pouse
        } else {
            stopRecording();
            pause()
            btnVideo.current.src = play
            downloadButton.current.disabled = false;
            setIsStart(false)
            stopStreamedVideo(localStreamRef)

        }
    }

    const stopRecording = () => {

        mediaR.stop();
        anim.current.style.display = 'none';
       
        // clickDownload()

        // להפעיל פונקציה שעוצרת את השעון
        // אני רוצה להפעיל את היוז אפקט רק אם הוא מתחיל סרטון 
        // ואני לא יכולה לשנות את הסטייט לטרו בעצירת סרטון כי אז הוא מבצע לי את יוז אפקט
    }
    const startRecording = () => {
        start()
        debugger
        let mr
        try {
            mr = new MediaRecorder(window.store.getState().socketReducer.localStream, { mimeType: "video/webm;codecs=vp8,vp9,opus" });

            // mr = new MediaRecorder(window.store.getState().socketReducer.localStream, { mimeType: "video/webm;codecs=vp9,opus" });//window.stream, options);
            setMediaR(mr)
        } catch (e0) {
            console.log('Unable to create MediaRecorder with options Object: ', { mimeType: "video/webm;codecs=vp9,opus" }, e0);
            try {
                mr = new MediaRecorder(window.store.getState().socketReducer.localStream, { mimeType: 'video/webm;codecs=vp8' });
                setMediaR(mr)
            } catch (e1) {
                console.log('Unable to create MediaRecorder with options Object: ', { mimeType: 'video/webm;codecs=vp8' }, e1);
                try {
                    mr = new MediaRecorder(window.store.getState().socketReducer.localStream, 'video/mp4');
                    setMediaR(mr)
                } catch (e2) {
                    alert('MediaRecorder is not supported by this browser.');
                    console.error('Exception while creating MediaRecorder:', e2);
                    return;
                }
            }

        }

    }
    // דוחף למערך סטרימים
    const handleDataAvailable = (event) => {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) {
            setRecordedBlobs(rb => [...rb, event.data]);
        }
    }
    const uploadVideo = () => {
        const blob = new Blob(recordedBlobs, { type: 'video/mebm' });
        let fileToUpload = new File([blob], `test.webm`, { lastModified: new Date().getTime(), type: blob.type })

        var myFile = new FormData();
        myFile.append("file", fileToUpload);

        $.ajax({

            type: "POST",
            url: "https://files.codes/api/" + userName + "/upload",
            headers: { Authorization: " liveChat/userWithOutJwt" },
            data: myFile,
            processData: false,
            contentType: false,
            success: (data) => {
                alert("upload success: "+data.data.url);
                console.log(data)
                setShowModal(true)
            },
            error: function (err) {
                alert('please try again later', err);

            },
        });

    }


    // להורדה

    const clickDownload = () => {
        // const blob = new Blob(recordedBlobs, { type: 'video/mebm' });
        // let file = new File([blob], `test.webm`, { lastModified: new Date().getTime(), type: blob.type })

        // const url = window.URL.createObjectURL(blob);
        // העלאה לשרת
        // uploadVideo()
        // const a = document.createElement('a');
        // a.style.display = 'none';
        // a.href = url;
        // a.download = 'test.webm';
        // document.body.appendChild(a);
        // a.click();
        // setTimeout(() => {
        //     document.body.removeChild(a);
        //     window.URL.revokeObjectURL(url);
        // }, 100);
        // setRecordedBlobs([])
        // setMediaR()
    }
    return (
        <>

            <div className="container">
                <div className="row">
                    <div id='showMessage'></div>
                    {ifShow ?
                        <>
                            {showMessageToShare}
                            {/* <h2>hi its from video</h2> */}
                        </>
                        // <div className='col-8'>

                        // </div>
                        : null}
                    {window.location.href.includes("admin") ?
                        <div className="col-12">
                            <div className="diVideo">
                                <video id="localVideo" height="100%" width="100%" muted={true} autoPlay ref={localStreamRef} >
                                </video>


                                <p class="blink_me oStyle styleA" ref={anim} >o</p>
                                <p className="styleB" ref={time}> <span >{h1}</span>:<span>{m1}</span>:<span>{s1}</span></p>
                                <div className="underDiv">
                                    <img src={play} ref={btnVideo} className="imgPlayPouse" onClick={!isStart ? e => StartVideo() : e => clickRecord()}
                                    //  onMouseOver={e => { (e.currentTarget.src = playDark) }}
                                    // onMouseOut={e => (e.currentTarget.src = play)}
                                    >
                                    </img>
                                    {/* <button onClick={e => StartVideo()} ref={startBtnRef}>start stream</button> */}
                                    <button id="download" onClick={uploadVideo} ref={downloadButton} style={{backgroundColor:"red"}}>Upload Video</button>
                                    <p class="live">Live</p>
                                </div>

                            </div></div>

                        :
                        <video id="localVideo" muted={isMuted()} height="100px" width="100px" autoPlay ref={localStreamRef} ></video>
                    }

                    {showModal ? <SaveVideoModle setShowModal={setShowModal}></SaveVideoModle> : null}
                </div>
            </div>
            {/* <Button variant="danger" onClick={(e) => { stopStreamedVideo(localStreamRef) }}>close camera</Button> */}
            {/* <Button variant="danger" onClick={(e) => { openCamera() }}>open camera</Button> */}

        </>
    )
}

export default Video
