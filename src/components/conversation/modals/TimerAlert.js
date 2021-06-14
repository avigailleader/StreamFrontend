import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

import './TimerAlert.css'

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
});

function TimerAlert(props) {

    const { showTimerAlert, record } = props;
    const { setshowTimerAlert, setIsRecording } = props;

    const handleClose = () => setshowTimerAlert(false);

    const startNewRecording = () => {
        setIsRecording(true);
        record();
        handleClose();
    }

    return (
        <Modal size="md" className="timerModal" show={showTimerAlert} onHide={handleClose}>
            <div size="md" className="upBorderColor"></div>
            <div className="row" style={{ direction: "rtl" }}>
                <MdClose onClick={handleClose} className="x col-2 offset-10 mt-3" />
            </div>
            <Modal.Body className="timerModalBody">
                <p className="timerModalTitle">Your time is up</p>
                <p className="timerModalText">
                    The maximum recording time is five minutes long<br />
                             would you like another five minutes?
                         </p>
                <Button className="btnEndRecordModal buttonBackGround mb-4 mt-2" size="sm" variant="secondary" onClick={startNewRecording}>Start a new recording</Button>
            </Modal.Body>
        </Modal>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TimerAlert));