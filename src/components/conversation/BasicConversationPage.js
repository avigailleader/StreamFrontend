import React, { useEffect, useState } from 'react';
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

function mapStateToProps(state) {
    return {
        currentUser: state.generalReducer.currentUser,
        visibleOptionsModal: state.generalReducer.visibleOptionsModal,
        cameraStatus: state.conversationReducer.cameraStatus,
        microphoneStatus: state.conversationReducer.microphoneStatus,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setConnectionUserModal: (connectionUserModel) => dispatch(actions.setConnectionUserModal(connectionUserModel)),
    setVisibleOptionsModal: (bool) => dispatch(actions.setVisibleOptionsModal(bool)),
    setCameraStatus: (cameraStatus) => dispatch(actions.setCameraStatus(cameraStatus)),
    setMicrophoneStatus: (microphoneStatus) => dispatch(actions.setMicrophoneStatus(microphoneStatus)),
});

function BasicPage(props) {
debugger
    const { setConnectionUserModal, visibleOptionsModal, cameraStatus, microphoneStatus } = props;
    const { setVisibleOptionsModal } = props;

    const [visibleChat, setVisibleChat] = useState(false);
    const [visibleUploadModal, setVisibleUploadModal] = useState(false);
    const [visibleBgPictureModal, setVisibleBgPictureModal] = useState(false);
    const [visibleBgVideoModal, setVisibleBgVideoModal] = useState(false);
    const [visibleShareScreenModal, setVisibleShareScreenModal] = useState(false);
    const [visibleShareScreenAlert, setVisibleShareScreenAlert] = useState(false);
    const [visibleShareScreenAlertPop, setVisibleShareScreenAlertPop] = useState(true);
    const [chatColor, setChatColor] = useState("black");

    // const [cameraStatus, setCameraStatus] = useState(true);
    // const [microphoneStatus, setMicrophoneStatus] = useState(true);
    const [audio, setAudio] = useState(microphoneStatus);
    const [video, setVideo] = useState(cameraStatus);

    return (
        <div className="container-fluid">
            <Sidebar id="sidebar" className="chat-sidebar justify-content-end" visible={visibleChat} baseZIndex={0} modal={false} position="right" style={{ backgroundColor: chatColor }} onHide={() => setVisibleChat(false)} >
                <Chat chatColor={chatColor} setChatColor={setChatColor} />
            </Sidebar>
            <div className="row">
               

                <OptionsModal 
               
                // visibleOptionsModal={visibleOptionsModal} setVisibleOptionsModal={setVisibleOptionsModal}
             
             
             // microphoneStatus={microphoneStatus} setMicrophoneStatus={setMicrophoneStatus}
                // cameraStatus={cameraStatus} setCameraStatus={setCameraStatus}
                />
                <Conversation className="col-12 " setVisibleOptionsModal={setVisibleOptionsModal} />
                <div className="row">
                    <ConversationActions className="col-4" visibleChat={visibleChat} setVisibleChat={setVisibleChat}
                        setVisibleUploadModal={setVisibleUploadModal} visibleUploadModal={visibleUploadModal}
                        visibleShareScreenModal={visibleShareScreenModal} setVisibleShareScreenModal={setVisibleShareScreenModal}
                        audio={audio} setAudio={setAudio} video={video} setVideo={setVideo}
                  
                    />

                    <div className=" col-3 ">

                        <FullScreen />

                    </div>

                </div>
            </div>
            <UploadModal visibleUploadModal={visibleUploadModal} setVisibleUploadModal={setVisibleUploadModal}
                setVisibleBgPictureModal={setVisibleBgPictureModal}
                setVisibleBgVideoModal={setVisibleBgVideoModal}
            />
            <BgPictureModal visibleBgPictureModal={visibleBgPictureModal} setVisibleBgPictureModal={setVisibleBgPictureModal}
                setVisibleUploadModal={setVisibleUploadModal}
            />
            <BgVideoModal visibleBgVideoModal={visibleBgVideoModal} setVisibleBgVideoModal={setVisibleBgVideoModal} />
            <ShareScreenModal visibleShareScreenModal={visibleShareScreenModal} setVisibleShareScreenModal={setVisibleShareScreenModal}
            />
            {
                visibleShareScreenAlert ?
                    <ShareScreenAlert visibleShareScreenAlert={visibleShareScreenAlert} setVisibleShareScreenAlert={setVisibleShareScreenAlert}
                        setVisibleShareScreenAlertPop={setVisibleShareScreenAlertPop}
                    ></ShareScreenAlert>
                    : ""
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BasicPage));