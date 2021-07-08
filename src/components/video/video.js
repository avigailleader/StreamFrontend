import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../redux/actions/action';
import './video.css'
import pouse from "../../assets/Group 21662.svg"
import play from "../../assets/Component 719 – 5.svg"
import playDark from "../../assets/Group 21705.svg"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import img from '../../assets/chats&viewers/user.png';
import { useStopwatch } from 'react-timer-hook';
import $ from 'jquery';
import { IoIosClose } from 'react-icons/io';
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
    const [ifShow, setIfShow] = useState(false)
    const [visibleCanvas, setVisibleCanvas] = useState(false)
    // const [message, setMessage]=useState({})
    let canvas, message, ctx, closeVisibleCanvas;
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
    // setInterval(() => { }, 1000)
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

    const setIfShowStatus = (status) => {
        setVisibleCanvas(true)
        setIfShow(status)
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
            console.log(recMessage);
            debugger
            message = recMessage
            setIfShowStatus(true)
        });
    }, [])

    const handleClose = () => {
        //לסגירת המודל
        setVisibleCanvas(false);
    }
    const drawXClose = () => {
       
        closeVisibleCanvas = document.getElementById("myClose")

        let data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
           
            // `${<IoIosClose id="myClose" onClick={handleClose} size="24" className="x xClosecanvas col-2 offset-10 mt-2" />}` +
           ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='XClose'  viewBox="0 0 16 16">`
                +'<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />'
            +'</svg>' +
            '</div>' +
            '</foreignObject>' +
            '</svg>';

        let DOMURL = window.URL || window.webkitURL || window;

        let img = new Image();
        // img.onClick=handleClose()
        let svg = new Blob([data], {
            type: 'image/svg+xml;charset=utf-8'
        });
        let url = DOMURL.createObjectURL(svg);

        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);
        }

        img.src = url;
    }
    useEffect(() => {
        if (ifShow) {
            canvas = document.getElementById("myCanvas");
            ctx = canvas.getContext('2d');
            drawXClose()
            ctx.font = "20px Georgia";
            ctx.fillStyle = "#5F5F5F";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeText("hello world", 100, 60);


            let iimg = new Image();
            iimg.src = img;
            let pat = ctx.drawImage(iimg, 20, 15);
            $('#myCanvas').show('fast', 'linear', () => {
                setTimeout(() => {
                    $('#myCanvas').slideDown(1000, 'fast')
                    setIfShowStatus(false);
                }, 10000)
            })

            ctx.fillStyle = pat;
            ctx.fill();


        }
    }, [ifShow])


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
    useEffect(() => {
        if (mediaR) {
            console.log("mediaR:", mediaR)
            console.log('Created MediaRecorder', mediaR, 'with options', { mimeType: "video/webm;codecs=vp9,opus" });
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
            console.log("mediaR:", mediaR);
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
        // להפעיל פונקציה שעוצרת את השעון
        // אני רוצה להפעיל את היוז אפקט רק אם הוא מתחיל סרטון 
        // ואני לא יכולה לשנות את הסטייט לטרו בעצירת סרטון כי אז הוא מבצע לי את יוז אפקט
    }
    const startRecording = () => {
        start()
        let mr
        try {
            mr = new MediaRecorder(window.store.getState().socketReducer.localStream, { mimeType: "video/webm;codecs=vp9,opus" });//window.stream, options);
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
    const uploadVideo = (fileToUpload) => {

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
                alert("upload success");
                console.log(data)

            },
            error: function (err) {
                alert('please try again later', err);

            },
        });

    }


    // להורדה

    const clickDownload = () => {
        const blob = new Blob(recordedBlobs, { type: 'video/webm' });
        const url = window.URL.createObjectURL(blob);
        // העלאה לשרת
        uploadVideo(url)
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
        setRecordedBlobs([])
        setMediaR()
    }
    return (
        <>

            <div className="container">
                <div className="row">
                    {ifShow ?
                        <>
                            <canvas id="myCanvas" className='canvas'></canvas>
                        </>
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
                                    >
                                    </img>
                                    <button id="download" onClick={clickDownload} ref={downloadButton}>Download</button>
                                    <p class="live">Live</p>
                                </div>
                            </div></div>
                        :
                        <video id="localVideo" muted={isMuted()} height="100px" width="100px" autoPlay ref={localStreamRef} ></video>
                    }
                </div >
            </div >

            {/* <Button variant="danger" onClick={(e) => { stopStreamedVideo(localStreamRef) }}>close camera</Button> */}
            {/* <Button variant="danger" onClick={(e) => { openCamera() }}>open camera</Button> */}

        </>
    )
}

export default Video;
