import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../../redux/actions/action';
import '../video.css'
import pouse from "../../../assets/Group 21662.svg"
import play from "../../../assets/Component 719 – 5.svg"
import axios from 'axios'
import keys from "../../../config/env/keys"
// import env from '../../../config/env/dev'
import imgVolum from '../../../assets/volum.png'

import video from '../../../assets/1.mp4';

import { useStopwatch } from 'react-timer-hook';
const UserVideo = (props) => {
    const { history } = props;
    const [displayVideo, setDisplayVideo] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [isStart1, setIsStart1] = useState(false);
    const [remoteVideo, setRemoteVideo] = useState();
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const viewers = useSelector(state => state.convarsetionReducer.viewer)
    const [viewersP, setViewersP] = useState(viewers)
    // const localStreamRef = useRef()
    const localStreamRef1 = useRef()
    // const [localStreamRef, setLocalStreamRef] = useState(localStreamRef1)
    let room
    const createPeer1 = () => {
        debugger
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"

                }
            ]
        });
        peer.ontrack = handleTrackEvent1;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent1(peer);

        return peer;
    }

    const handleNegotiationNeededEvent1 = async (peer) => {
        debugger
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        const payload = {
            sdp: peer.localDescription
        };

        const { data } = await axios.post(keys.BASE_URL + 'consumer', payload);
        const desc = new RTCSessionDescription(data.sdp);
        peer.setRemoteDescription(desc).catch(e => console.log(e));
    }
    const handleTrackEvent1 = (e) => {
        debugger
        // setLocalStreamRef((a) => a.current.srcObject = e.streams[0])
        // document.getElementById("video").srcObject = e.streams[0];
        // dispatch(actions.setLocalStream(e.streams[0]))
        // setRemoteVideo(e.streams[0]);
        localStreamRef1.current.srcObject = e.streams[0];
        // localStreamRef1.current.src = video;
    };


    useEffect(() => {
        setDisplayVideo(true)
        let userName = ""
        userName = window.location.pathname.split("/")[1];
        debugger
        const peer = createPeer1();
        peer.addTransceiver("video", { direction: "recvonly" })
        console.log("username!! " + userName)
        dispatch(actions.setUserName(userName))
        // dispatch(actions.setStreamConstraints({ "video": false, "audio": false }))
        // dispatch(actions.setConnectionUserModal(true))
        room = userName
        socket.emit('join', { room });
        socket.on('not exist room', () => { history.push('/notExist') });
        socket.on('joined', () => { alert("joined successfully to " + room) });
        socket.on('receive-message-to-all', message => {
            console.log("receive-message-to-all " + message);
            dispatch(actions.setReceiveMessageToAll(message))
        });
        socket.on("viewer", viewer => {
            console.log(viewer.viewers);
            dispatch(actions.setViewer(viewer.viewers))
        })
    }, [])
    useEffect(() => {
        debugger
        setViewersP(viewers)
    }, [viewers])



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="diVideo">

                            <video id="localVideo" autoPlay playsInline muted ref={localStreamRef1} style={{ width: "500", border: "2px solid yellow" }} />


                            <div className="underDiv row">

                                <div className="col-2" class="viewersP">{viewersP} Viewers</div>
                                <img id="imgVolum" src={imgVolum} />
                                <p className="col-2" class="live">Live</p>
                            </div>
                        </div></div>


                </div>
            </div>
        </>
    )
}
export default UserVideo
