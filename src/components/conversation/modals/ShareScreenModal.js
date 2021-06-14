import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

import screen1 from '../../../assets/screen1.png';
import screen2 from '../../../assets/screen2.png';
import screen3 from '../../../assets/screen3.png';
import screen4 from '../../../assets/screen4.png';
import screen5 from '../../../assets/screen5.png';
import screen6 from '../../../assets/screen6.png';


const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
});

function ShareScreenModal(props) {

    const { visibleShareScreenModal } = props;
    const { setShowShareScreen, setVisibleShareScreenModal } = props;

    const handleClose = () => setVisibleShareScreenModal(false);

    return (
        <div className="row">
            <Modal size="md" className="uploadImageModal" show={visibleShareScreenModal} onHide={handleClose} dialogClassName="modalDiv">
                <div size="md" className="upBorderColor"></div>
                <div className="row">
                    <MdClose onClick={handleClose} className="x col-2 offset-10 mt-1 mb-1" />
                </div>
                <Modal.Body>
                    <h1 className="text-centerModal">Select a screen to share</h1>
                    <div className="backGroundsScrollDiv row">
                        <img className="imgBackGround col-4" src={screen1}  ></img>
                        <img className="imgBackGround col-4" src={screen2}  ></img>
                        <img className="imgBackGround col-4" src={screen3}  ></img>
                        <img className="imgBackGround col-4" src={screen4}  ></img>
                        <img className="imgBackGround col-4" src={screen5}  ></img>
                        <img className="imgBackGround col-4" src={screen6}  ></img>
                        <img className="imgBackGround col-4" src={screen6}  ></img>
                    </div>
                    <Button className="buttonBackGround " variant="secondary" onClick={handleClose}>Save</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShareScreenModal));