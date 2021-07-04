
import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Draggable from 'react-draggable'
import * as faceapi from 'face-api.js';

import { actions } from '../../redux/actions';
import * as socketService from '../../services/socket.service';

import './conversation.css';
import privateChat from '../../assets/privateChat.png';
import chizim from '../../assets/chizimOut.png';
import chizimInner from '../../assets/chizimInner.png';

import personImg from '../../assets/localVideo.jpg';
import shareScreen from '../../assets/shareScreen.jpg';


const mapStateToProps = (state) => {
    return {
        socket: state.socketReducer.socket,
        remoteVideo: state.socketReducer.remoteVideo,
        remoteStream: state.socketReducer.remoteStream,
        localStream: state.socketReducer.localStream,
        localVideo: state.socketReducer.localVideo,
        localVideoStatus: state.conversationReducer.localVideoStatus,
        currentUser: state.generalReducer.currentUser,
        countParticipantInConversion: state.generalReducer.countParticipantInConversion,
        borderSpeakingVideoOptions: state.conversationReducer.borderSpeakingVideoOptions,
        fakeUser: state.generalReducer.fakeUser,
        conversationOpened: state.generalReducer.conversationOpened,
        shareScreenStatus: state.conversationReducer.shareScreenStatus,
        cameraStatus: state.conversationReducer.cameraStatus,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setRoomId: (roomId) => dispatch(actions.setRoomId(roomId)),
    setConnectionUserModal: (connectionUserModel) => dispatch(actions.setConnectionUserModal(connectionUserModel)),
    setVisibleOptionsModal: (p) => dispatch(actions.setVisibleOptionsModal(p)),
    setLocalVideo: (localVideo) => dispatch(actions.setLocalVideo(localVideo)),
    setRemoteVideo: (remoteVideo) => dispatch(actions.setRemoteVideo(remoteVideo)),
    setCountParticipantInConversion: (count) => dispatch(actions.setCountParticipantInConversion(count)),
    setIfJoinedUser: (ifJoinedUser) => dispatch(actions.setIfJoinedUser(ifJoinedUser)),
    setLocalImgStream: (stream) => dispatch(actions.setLocalImgStream(stream)),
    setBorderSpeakingVideoOptions: (color) => dispatch(actions.setBorderSpeakingVideoOptions(color)),
    setConversationOpened: (conversationOpened) => dispatch(actions.setConversationOpened(conversationOpened)),
    dispatch: dispatch,
});

function Conversation(props) {

    const { history, borderSpeakingVideoOptions, localStream, conversationOpened, socket, fakeUser, remoteVideo, localVideo, countParticipantInConversion, remoteStream, localVideoStatus, currentUser, cameraStatus } = props;
    const { setBorderSpeakingVideoOptions, dispatch, shareScreenStatus, setRoomId, setCountParticipantInConversion, setConnectionUserModal, setVisibleOptionsModal, setLocalVideo, setRemoteVideo, setIfJoinedUser, setLocalImgStream } = props;

    const remoteVideoRef = useRef();
    const localVideoRef = useRef();
    const imgLocalVideoRef = useRef();
    const isShowVideo = useRef();
    const localBigVideoRef = useRef();
    const backGround = useRef();
    const remoteCircleVideoRef = useRef();

    const [locallShareScreen, setLocallShareScreen] = useState(false);
    const [activeDrags, setActiveDrags] = useState(0);
    const [remoteeVideoRef, setRemoteeVideoRef] = useState(remoteVideoRef);
    const [locallBigVideoRef, setLocallBigVideoRef] = useState(localVideoRef);
    const [locallVideoRef, setLocallVideoRef] = useState(localBigVideoRef);
    const [shareScreeen, setShareScreeen] = useState(false);
    const [bigVideoConnection, setBigVideoConnection] = useState(false);
    const [isBigVideo, setIsBigVideo] = useState(true);
    const [isBigShareScreen, setIsBigShareScreen] = useState(true);
    const [isBigShareScreens, setIsBigShareScreens] = useState(true);
    const [isShareScreen, setIsShareScreen] = useState(false);
    // const [isRemoteCamera, setIsRemoteCamera] = useState(true);
    const [isRemoteCamera, setIsRemoteCamera] = useState(false);
    const [conversationHungUp, setConversationHungUp] = useState(false);
    const [leaveConversationName, setLeaveConversationName] = useState("");
    const [controlledPosition, setControlledPosition] = useState({
        x: -400,
        y: 200
    });

    let canvasSmall, canvasLarge, contextSmall, contextLarge, video;

    useEffect(() => {
        setBorderSpeakingVideoOptions("#CBFA15")
        setLocalVideo(localVideoRef.current);
        setRemoteVideo(remoteVideoRef.current);
        setLocalVideo(localBigVideoRef.current);
        if (remoteStream !== "" && remoteVideo !== "") {
            remoteVideo.srcObject = remoteStream;
            setRemoteVideo(remoteVideo);
            setLocallVideoRef(remoteVideoRef);
            setLocallBigVideoRef(localBigVideoRef);
            setRemoteeVideoRef(localVideoRef);
        }
        else {
            setIfJoinedUser(true);
        }
        socketService.openMediaSource();
        socketService.moreSettings();
        if (window.location.href.includes('connection')) {
            console.log(countParticipantInConversion, "countParticipantInConversion");
            let num = countParticipantInConversion + 1;
            setCountParticipantInConversion(num);
            let room = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
            setRoomId(room);
            socket.emit('join', { room });
            if (!window.location.href.includes('connection/conversation'))
                setConnectionUserModal(true);
        }
        else {
            let room = Math.random(10).toString(36).substring(7);
            setRoomId(room);
            socket.emit('create', { room });
        }
        socket.on('created', event => dispatch({ type: 'CREATED_EVENT_FROM_SOCKET', payload: event }));
        socket.on('joined', event => { dispatch({ type: 'JOINED_EVENT_FROM_SOCKET', payload: event }) });
        socket.on('candidate', event => socketService.candidateEventFromSocket(event));
        socket.on('ready', event => { dispatch({ type: 'READY_EVENT_FROM_SOCKET', payload: event }) });
        socket.on('offer', event => dispatch({ type: 'OFFER_EVENT_FROM_SOCKET', payload: event }));
        socket.on('answer', event => socketService.answerEventFromSocket(event));
        socket.on('toggleAudio', event => socketService.toggleAudioEventFromSocket(event));
        socket.on('toggleVideo', event => dispatch({ type: 'TOGGLE_VIDEO_EVENT_FROM_SOCKET', payload: event }));
        socket.on('userJoind', event => showVideo(event));
        socket.on('toggleShareScreen', event => setToggleShareScreen(event));
        socket.on('setcamerastatus', event => ssetIsRemoteCamera(event));
        socket.on('endConversation', event => setConversationHungUp(true));
        socket.on('leaveConversation', name => setLeaveConversationName(name));

    }, []);

    //, במקרה שהמנהל עזב את השיחה תוצג הודעה ע"כ
    // השיחה תסגר
    //והמצטרפים יועברו לדף השיחות האחרונות
    useEffect(() => {
        if (conversationHungUp) {
            alert("The conversation manager colsed the conversation");
            setInterval(function () {
                history.push(`/${window.store.getState().generalReducer.userName}/lastConversations`);
            }, 4000);

        }
    }, [conversationHungUp]);

    //במקרה שמישהו עזב את השיחה תוג הודעה שהוא עזב ותעלם הבועית שלו
    useEffect(() => {
        if (leaveConversationName != "") {
            alert(leaveConversationName + " left the conversation");
            remoteCircleVideoRef.current.style.display = "none";
        }
    }, [leaveConversationName]);


    useEffect(() => {
        if (fakeUser) {
            canvasSmall = document.getElementById('viewsmall');
            canvasLarge = document.getElementById('viewlarge');
            contextSmall = canvasSmall.getContext('2d');
            contextLarge = canvasLarge.getContext('2d');
            video = document.getElementById('localVideo');
            makeImgProfile();
        }
        // eslint - disable - next - line react - hooks / exhaustive - deps
    }, [fakeUser]);

    // useEffect(() => {
    //    if (shareScreenStatus){
    //    setIsBigShareScreen(true)
    // }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [shareScreenStatus]);
    useEffect(() => {
        if (!conversationOpened)
            if (localStream !== "" && localVideo !== "") {
                setVisibleOptionsModal(true);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStream]);

    //הגרלת צבע
    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
        return color;
    }
    const ssetIsRemoteCamera = (event) => {
        console.log('ssetIsRemoteCamera')
        setIsRemoteCamera(event)

    }
    //יצירת תמונת פרופיל של המשתמש שיצר את השיחה
    const makeImgProfile = () => {


        contextSmall.beginPath();
        contextSmall.fillStyle = randomColor();
        contextSmall.strokeStyle = "red";
        contextSmall.font = "100px Arial";
        contextSmall.lineWidth = 10;
        contextSmall.arc(100, 100, 100, 0, 2 * Math.PI);


        if (!currentUser) {
            let bigLetter
            let letter = fakeUser ? fakeUser.name.slice(0, 1) : "n"
            if ((/[\u0590-\u05FF]/).test(letter) == false) { bigLetter = letter.toUpperCase(); }
            bigLetter = letter;
            contextSmall.fill();
            contextSmall.beginPath();
            contextSmall.fillStyle = "white";
            contextSmall.fillText(bigLetter, 80, 130);
            contextSmall.fill();

        }

        else {
            contextSmall.clip();
            var canvas = document.getElementById('viewsmall'),
                context = canvas.getContext('2d');
            var base_image = new Image();
            base_image.onload = function () {
                context.drawImage(base_image, 0, 0, 200, 200);
            }
            base_image.crossOrigin = "anonymous";
            base_image.src = currentUser.imgProfile;


        }


        const streamImg = canvasSmall.captureStream(25);
        setLocalImgStream(streamImg);
    }


    const showVideo = () => {
        if (isShowVideo.current != null)
            isShowVideo.current.style.display = "block";
    }
    const setToggleShareScreen = (event) => {
        setIsShareScreen(event)
        setIsBigShareScreens(true)
    }

    const squareVideo = () => {
        if (bigVideoConnection) {
            setBigVideoConnection(false);
        }
        if (isBigShareScreens) {
            setIsBigShareScreens(false)
        }
        setIsBigVideo(!isBigVideo);
        if (shareScreenStatus === true) {
            setIsBigShareScreen(!isBigShareScreen)
        }
        else {
            setIsBigShareScreen(true)
        }
        // imgLocalVideoRef.current.style.opacity = isBigVideo == false ? "0" : "1";
        backGround.current.style.background = isBigVideo == false ? "black" : "none";
    }

    const onControlledDrag = (e, position) => {
        const { x, y } = position;
        setControlledPosition({ x: x, y: y })
    };

    const onControlledDragStop = (e, position) => {
        onControlledDrag(e, position);
        onStop();
    };

    const onStop = () => {
        console.log('stop');
        setActiveDrags(activeDrags - 1);
        console.log(activeDrags);
    }

    // const onStart = () => {
    //     console.log('start');
    //     setActiveDrags(activeDrags + 1);
    //     console.log(activeDrags);
    // }

    // const dragHandlers = { onStart: onStart, onStop: onStop };

    //-----------------------------------------------------------------------

    // Promise.all([
    //     console.log("1111111111111111111111🚀 ~ file: Conversation.js ~ line 291 ~ ConversationActions ~ faceapi.nets", faceapi.nets),
    //     faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    //     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    //     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    //     faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    // ]).then(
    //     console.log("2222222222222222222222🚀 ~ file: Conversation.js ~ line 153 ~ ConversationActions ~ res")
    // )

    // const playVideoFunc = () => {
    //     console.log("FACEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    //     const canvas = faceapi.createCanvasFromMedia(localVideo);
    //     document.body.append(canvas);
    //     const displaySize = { width: locallVideoRef.current.clientWidth, height: locallVideoRef.current.clientHeight }
    //     faceapi.matchDimensions(canvas, displaySize);
    //     setInterval(async () => {

    const func = () => {
        setShareScreeen(!shareScreeen)
        console.log("sharescreen", shareScreeen)
    }

    //לחיצה על המסך הודיאו של המצטרף על כל המסך
    const clickBigVideoConnection = () => {
        if (isBigVideo) {
            setIsBigVideo(false);
        }
        if (isBigShareScreen) {
            setIsBigShareScreen(false)
        }
        setBigVideoConnection(!bigVideoConnection);
        if (isShareScreen === true) {
            setIsBigShareScreens(!isBigShareScreens)
        }
        else {
            setIsBigShareScreens(true)
        }
    }
    const locallShareScreen1 = () => {
        setLocallShareScreen(!locallShareScreen);
    }

    return (
        <>
            <div className="container-fluid" ref={backGround}>
                <canvas id="viewsmall" width="200" height="200" style={{ display: 'none' }}></canvas>
                <canvas id="viewlarge" width="300" height="150" style={{ display: 'none' }}></canvas>‏‏
                {
                    !localVideoStatus ?
                        currentUser ?
                            <img alt="" src={currentUser.picture} className="localProfile" width="150px"></img>
                            :

                            <img alt="" className="localProfile" width="150px"></img>
                        : ""
                }
                <div className="row">
                    <div className={`${shareScreenStatus == true && isBigShareScreen ? 'video-square-background' : isBigVideo && shareScreenStatus == false ? 'video-square-background' : 'wrapVideo'}`}>
                        {bigVideoConnection || (!isBigVideo && !bigVideoConnection) || (shareScreenStatus && !isBigShareScreen) ?
                            <img src={personImg} ref={imgLocalVideoRef} className="imgLocalVideo" />
                            : ""}
                        {localVideoStatus ?
                            <video id="localVideo" muted className={`video-${isBigVideo && shareScreenStatus === false && cameraStatus == true ? 'square' : isBigVideo && shareScreenStatus === false ? 'square-profile ' : shareScreenStatus && isBigShareScreen ? 'square-full' : 'circle'}`} autoPlay ref={locallVideoRef}>
                            </video>
                            :
                            <video mirrorVideo={true} muted autoPlay ></video>}
                        {shareScreenStatus == true && isBigShareScreen || (isBigVideo && shareScreenStatus == false) ?
                            <img src={chizimInner} onClick={squareVideo} id='chizimVideoBiger' className="showme"></img>
                            :

                            <img src={chizim} onClick={squareVideo} id='chizimVideo'></img>
                        }
                        {!isBigVideo ?
                            <div>
                                {
                                    locallShareScreen ?
                                        <img id="localChizimScreen" src={chizim} onMouseOver={locallShareScreen1} onMouseOut={locallShareScreen1} />
                                        :
                                        <img id="localShareScreen" src={shareScreen} onMouseOver={locallShareScreen1} />
                                }
                            </div>
                            : ""}
                    </div>

                </div>
                <div ref={remoteCircleVideoRef} style={{ display: "block" }}>
                    <Draggable bounds='body' position={controlledPosition} onDrag={onControlledDragStop}>
                        <div className={`${bigVideoConnection && isShareScreen === false ? 'video-square-connection-background' : isShareScreen && isBigShareScreens ? 'video-square-connection-background' : 'divDrag'}`}>
                            {/* <video id="gum" className="video-circle" onMouseOver={showPointsFunc} autoPlay playsInline ref={remoteeVideoRef} style={{ borderColor: borderSpeakingVideoOptions }} /> */}
                            <video className={`${bigVideoConnection && isShareScreen === false && isRemoteCamera ? 'video-square-connection' : bigVideoConnection && isShareScreen === false ? 'video-square-profile' : isShareScreen && isBigShareScreens ? 'video-square-full-connection' : 'gum '}`} autoPlay playsInline ref={remoteeVideoRef} style={{ borderColor: borderSpeakingVideoOptions }} />
                            {bigVideoConnection ?
                                <img src={chizimInner} onClick={clickBigVideoConnection} id='chizimBig' className="showme"></img>
                                :
                                <img src={chizim} onClick={clickBigVideoConnection} id='chizim' className="showme"></img>
                            }
                            {bigVideoConnection === false ?
                                <img src={privateChat} id="privateChat" className="showme"></img>
                                : ""}
                            {/* {isShareScreen == true && isBigShareScreens || (bigVideoConnection && isBigShareScreens == false) ? */}
                            {shareScreeen ?
                                <img id="chizimScreen" src={chizim} onMouseOver={func} onMouseOut={func} />
                                :
                                <img id="shareScreen" src={shareScreen} onMouseOver={func} />
                            }
                        </div>
                    </Draggable>
                </div>
            </div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Conversation));
