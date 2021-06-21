import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons';
import { actions } from '../../../redux/actions';
import { MdClose } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';
import * as socketService from '../../../services/socket.service';

import grayVideoCameraIcon from '../../../assets/grayVideoCameraIcon.png';
import grayMicrophoneIcon from '../../../assets/grayMicrophoneIcon.png';
import { useDispatch, useSelector } from "react-redux";

const mapStateToProps = (state) => {
    return {
        localVideo: state.socketReducer.localVideo,
        localStream: state.socketReducer.localStream,
        visibleOptionsModal: state.generalReducer.visibleOptionsModal,
        cameraStatus: state.conversationReducer.cameraStatus,
        microphoneStatus: state.conversationReducer.microphoneStatus,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setVisibleOptionsModal: (p) => dispatch(actions.setVisibleOptionsModal(p)),
    setLocalStream: (localStream) => dispatch(actions.setLocalStream(localStream)),
    // setCameraStatus: (cameraStatus) => dispatch(actions.setCameraStatus(cameraStatus)),
    toggleVideoStatus: (videoStatus) => dispatch({ type: 'TOGGLE_VIDEO_STATUS', payload: videoStatus }),
    toggleAudioStatus: (audioStatus) => dispatch({ type: 'TOGGLE_AUDIO_STATUS', payload: audioStatus }),
    dispatch: dispatch,
});

function OptionsModal(props) {
    const dispatch = useDispatch()
    const setVisibleOptionsModal = useSelector(state => state.socketReducer.localVideo)
    const { visibleOptionsModal, cameraStatus, microphoneStatus, localStream, dispatch } = props;
    const { toggleVideoStatus, toggleAudioStatus, setMicrophoneStatus, setVisibleOptionsModal } = props;

    const [cameraStatusChoosen, setCameraStatusChoosen] = useState(true);
    const [microphoneStatusChoosen, setMicrophoneStatusChoosen] = useState(true);

    useEffect(() => {
        if (visibleOptionsModal) {
            // socketService.toggleAudio(false);
            toggleAudioStatus(false);
            // socketService.toggleVideo(false);
            toggleVideoStatus(false);
            // localStream.getAudioTracks()[0].enabled = false;
            // dispatch(actions.streamConstraints(localStream));
        }
    }, [visibleOptionsModal]);


    const handleClose = () => {

        //לסגירת המודל
        setVisibleOptionsModal(false);
        toggleVideoStatus(cameraStatusChoosen);
        toggleAudioStatus(microphoneStatusChoosen)
        // socketService.toggleVideo(cameraStatus);
        // socketService.toggleAudio(microphoneStatus);
    }
    const microphoneStatusFunc = (e) => {
        // setMicrophoneStatus(e.target.checked);
        setMicrophoneStatusChoosen(e.target.checked);
    }
    const cameraStatusFunc = (e) => {
        // toggleVideoStatus(e.target.checked);
        setCameraStatusChoosen(e.target.checked);
    }

    return (
        <div className="row">
            <Modal size="md" className="optionsModal mt-5" show={visibleOptionsModal}>
                <div size="md" className="upBorderColor"></div>
                <div className="row">
                    <IoIosClose onClick={handleClose} size="24" className="x xCloseOptionsModal col-2 offset-10 mt-2" />
                </div>
                <Modal.Body className="">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" value="Turn on the microphone" id="d1" name="d1" defaultChecked={microphoneStatusChoosen}
                            onChange={microphoneStatusFunc} />
                        <img src={grayMicrophoneIcon} className="grayMicrophoneIcon mr-3 ml-3" style={{ color: "black" }}></img>
                        <label className="form-check-label" for="d1">Permission to access the microphone</label><br></br>
                    </div>
                    <div className="form-check form-switch mt-2">
                        <input type="checkbox" className="form-check-input" value="Activating a camera" id="d2" name="d2" defaultChecked={cameraStatusChoosen} onChange={cameraStatusFunc} />
                        <img src={grayVideoCameraIcon} className="grayVideoCameraIcon mr-3 ml-3"></img>
                        <label className="form-check-label" for="d2">Permission to access the camera</label><br></br>
                    </div>
                    <div className="d-flex justify-content-center" >
                        <Button className="btnOptionsModal buttonBackGround" onClick={handleClose} size="sm">Continue</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OptionsModal));