import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar } from 'primereact/sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import Conversation from './Conversation';
import ConversationActions from './ConversationActions';
import Chat from '../chat/chat';
import UploadModal from './modals/UploadModal';
import BgPictureModal from './modals/BgPictureModal';
import BgVideoModal from './modals/BgVideoModal';
import ShareScreenModal from './modals/ShareScreenModal';
import ShareScreenAlert from './modals/ShareScreenAlert';
import OptionsModal from './modals/OptionsModal';
import FullScreen from './FullScreen'
import { actions } from '../../redux/actions';
import RecognitionSpeak from './RecognitionSpeak.js'
import Dictaphone from './RecognitionSpeak.js'

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import '../conversation/conversation.css';
import '../chat/chat.css';


const mapDispatchToProps = (dispatch) => ({
    setConnectionUserModal: (connectionUserModel) => dispatch(actions.setConnectionUserModal(connectionUserModel)),
    // setVisibleOptionsModal: (bool) => dispatch(actions.setVisibleOptionsModal(bool)),
    setCameraStatus: (cameraStatus) => dispatch(actions.setCameraStatus(cameraStatus)),
    setMicrophoneStatus: (microphoneStatus) => dispatch(actions.setMicrophoneStatus(microphoneStatus)),
});

const BasicPage = (props) => {
    // const currentUser=useSelector(state => state.generalReducer.currentUser),
    // const visibleOptionsModal=useSelector(state => state.generalReducer.visibleOptionsModal),
    debugger
    // const { setConnectionUserModal, visibleOptionsModal, cameraStatus, microphoneStatus } = props;
    // const { setVisibleOptionsModal } = props;

    const [cameraStatus, setCameraStatus] = useState(true);
    const [microphoneStatus, setMicrophoneStatus] = useState(true);
    const [audio, setAudio] = useState(microphoneStatus);
    const [video, setVideo] = useState(cameraStatus);
    const [visibleOptionsModal, setVisibleOptionsModal] = useState(true);
    const handleClick = useCallback(
        () => {
            setVisibleOptionsModal(!visibleOptionsModal)
        },
        [visibleOptionsModal],
    );

    return (
        <div className="container-fluid">

            <div className="row">
                <OptionsModal
                    visibleOptionsModal={visibleOptionsModal} setVisibleOptionsModal={handleClick}

                    microphoneStatus={microphoneStatus} setMicrophoneStatus={setMicrophoneStatus}
                    cameraStatus={cameraStatus} setCameraStatus={setCameraStatus}
                />
            </div>
        </div>
    );
}

export default connect(mapDispatchToProps)(withRouter(BasicPage));