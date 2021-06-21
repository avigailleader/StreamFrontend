import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector,component } from 'react-redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import { actions } from '../../../redux/actions/action';

import { IoIosClose } from 'react-icons/io';
import * as socketService from '../../../services/socket.service';

import grayVideoCameraIcon from '../../../assets/modal/grayVideoCameraIcon.png';
import grayMicrophoneIcon from '../../../assets/modal/grayMicrophoneIcon.png';



// const mapDispatchToProps = (dispatch) => ({
//     setVisibleOptionsModal: (p) => dispatch(actions.setVisibleOptionsModal(p)),
//     setLocalStream: (localStream) => dispatch(actions.setLocalStream(localStream)),
//     // setCameraStatus: (cameraStatus) => dispatch(actions.setCameraStatus(cameraStatus)),
//     toggleVideoStatus: (videoStatus) => dispatch({ type: 'TOGGLE_VIDEO_STATUS', payload: videoStatus }),
//     toggleAudioStatus: (audioStatus) => dispatch({ type: 'TOGGLE_AUDIO_STATUS', payload: audioStatus }),
//     dispatch: dispatch,
// });

const mapDispatchToProps = (dispatch) => ({
    // setVisibleOptionsModal: (p) => dispatch(actions.setVisibleOptionsModal(p)),
    // setLocalStream: (localStream) => dispatch(actions.setLocalStream(localStream)),
    // setCameraStatus: (cameraStatus) => dispatch(actions.setCameraStatus(cameraStatus)),
    toggleVideoStatus: (videoStatus) => dispatch({ type: 'TOGGLE_VIDEO_STATUS', payload: videoStatus }),
    toggleAudioStatus: (audioStatus) => dispatch({ type: 'TOGGLE_AUDIO_STATUS', payload: audioStatus }),
    dispatch: dispatch,
});
const OptionsModal = (props) => {

    // const dispatch = useDispatch()
    // const localVideo = useSelector(state => state.socketReducer.localVideo)
    // const localStream= useSelector(state => state.socketReducer.localStream)
    // const visibleOptionsModal=useSelector(state => state.generalReducer.visibleOptionsModal)
    // const cameraStatus=useSelector(state => state.conversationReducer.cameraStatus)
    // const microphoneStatus=useSelector(state => state.conversationReducer.microphoneStatus)

    const { cameraStatusChoosen,
        setCameraStatusChoosen,
        microphoneStatusChoosen,
        setMicrophoneStatusChoosen,
        setCamera,
        setvisibleOptionsModal,
        visibleOptionsModal } = props;
    // toggleVideoStatus, toggleAudioStatus


    // const [visibleOptionsModal, setVisibleOptionsModal] = useState(true);
    useEffect(() => {
        debugger
        if (true) {
          
            // visibleOptionsModal
            // socketService.toggleAudio(false);
            // toggleAudioStatus(false);
            // socketService.toggleVideo(false);
            // toggleVideoStatus(false);
            // localStream.getAudioTracks()[0].enabled = false;
            // dispatch(actions.streamConstraints(localStream));
        }
    }, []);

    const handleClose = () => {
     
        //לסגירת המודל
        setvisibleOptionsModal()
        // setVisibleOptionsModal(false);
        // toggleVideoStatus(cameraStatusChoosen);
        // toggleAudioStatus(microphoneStatusChoosen)
        // socketService.toggleVideo(cameraStatus);
        // socketService.toggleAudio(microphoneStatus);


        //        
        //     }
        //     render() {
        //       return <div ref={this.wrapper}>{this.props.children}</div>;
        //     }
        //   }


    }
    const microphoneStatusFunc = (e) => {
        debugger
        // setMicrophoneStatus(e.target.checked);
        setMicrophoneStatusChoosen(e.target.checked);

    }
    const cameraStatusFunc = (e) => {
        debugger
        // toggleVideoStatus(e.target.checked);
        // setCameraStatusChoosen(e.target.checked);
        setCamera(e.target.checked)

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
                        <input type="checkbox" className="form-check-input" value="Activating a camera" id="d2" name="d2" defaultChecked={cameraStatusChoosen}
                            onChange={cameraStatusFunc} />
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
export default (OptionsModal);