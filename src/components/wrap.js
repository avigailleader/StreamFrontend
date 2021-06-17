import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch,connect } from 'react-redux'

import Viewers from "./chat/admin/Viewers";
import MyChats from "./chat/admin/myChats";

import OptionsModal from '../components/conversation/modals/OptionsModal'
import {actions } from '../redux/actions/action'
// import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
    return {
      
        // cameraStatus: state.conversationReducer.cameraStatus,
        // microphoneStatus: state.conversationReducer.microphoneStatus,
    };
}

const Wrap = () => {
    // const cameraStatus=useSelector(state => state.conversationReducer.cameraStatus)
    // const microphoneStatus=useSelector(state => state.conversationReducer.microphoneStatus)
    const [cameraStatusChoosen, setCameraStatusChoosen] = useState(true);
    const [microphoneStatusChoosen, setMicrophoneStatusChoosen] = useState(true);
    // const [cameraStatus, setCameraStatus] = useState(true);
    // const [microphoneStatus, setMicrophoneStatus] = useState(true);
    // const [audio, setAudio] = useState(microphoneStatus);
    // const [video, setVideo] = useState(cameraStatus);
    const [visibleOptionsModal, setVisibleOptionsModal] = useState(true);

    const setvisibleOptionsModal = useCallback(
        () => {
            debugger
            setVisibleOptionsModal(!visibleOptionsModal)
        },
        [visibleOptionsModal],
    );
    const setCamera = useCallback(
        (status) => {
            debugger
            setCameraStatusChoosen(status)
        },
        [cameraStatusChoosen],
    );


    return (
        <div className="container-fluid">
            <div className="row">
               
                        <div>
                            <OptionsModal
                                microphoneStatusChoosen={microphoneStatusChoosen}
                                setMicrophoneStatusChoosen={setMicrophoneStatusChoosen}
                                cameraStatusChoosen={cameraStatusChoosen}
                                setcameraStatusChoosen={setCameraStatusChoosen}
                                setCamera={setCamera}
                                setvisibleOptionsModal={setvisibleOptionsModal}
                                visibleOptionsModal={visibleOptionsModal}></OptionsModal>
                           
                        </div>

            </div>
        </div>
    )
}

export default connect(mapStateToProps,null)(Wrap);
