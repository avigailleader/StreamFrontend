import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import OptionsModal from './modals/OptionsModal';
import { actions } from '../../redux/actions';
import '../chat/chat.css';

// function mapStateToProps(state) {
//     return {
//         currentUser: state.generalReducer.currentUser,
//         visibleOptionsModal: state.generalReducer.visibleOptionsModal,
//         cameraStatus: state.conversationReducer.cameraStatus,
//         microphoneStatus: state.conversationReducer.microphoneStatus,
//     };
// }

// const mapDispatchToProps = (dispatch) => ({
//     setConnectionUserModal: (connectionUserModel) => dispatch(actions.setConnectionUserModal(connectionUserModel)),
//     setVisibleOptionsModal: (bool) => dispatch(actions.setVisibleOptionsModal(bool)),
//     setCameraStatus: (cameraStatus) => dispatch(actions.setCameraStatus(cameraStatus)),
//     setMicrophoneStatus: (microphoneStatus) => dispatch(actions.setMicrophoneStatus(microphoneStatus)),
// });

function BasicPage(props) {
    debugger
    // const { setConnectionUserModal, visibleOptionsModal, cameraStatus, microphoneStatus } = props;
    // const { setVisibleOptionsModal } = props;


    // const [cameraStatus, setCameraStatus] = useState(true);
    // const [microphoneStatus, setMicrophoneStatus] = useState(true);
    // const [audio, setAudio] = useState(microphoneStatus);
    // const [video, setVideo] = useState(cameraStatus);

    return (

        <div className="container-fluid">

            <div className="row">
                <OptionsModal visibleOptionsModal={visibleOptionsModal} setVisibleOptionsModal={setVisibleOptionsModal}

                />
            </div>
        </div>
    );
}

export default connect()(withRouter(BasicPage));
// mapStateToProps, mapDispatchToProps    