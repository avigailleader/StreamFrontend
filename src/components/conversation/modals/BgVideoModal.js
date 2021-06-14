import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

import './modals.css'

const mapDispatchToProps = (dispatch) => ({
});

function BgVideoModal(props) {

    const { visibleBgVideoModal } = props;
    const { setVisibleBgVideoModal } = props;
    const handleClose = () => setVisibleBgVideoModal(false);

    return (
        <div className="container">
            <div className="row">
                <Modal size="md" show={visibleBgVideoModal} onHide={handleClose} dialogClassName="modalDiv">
                    <MdClose></MdClose>
                    <Modal.Body className="row"  >
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="buttonBackGround" variant="secondary" onClick={handleClose}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default connect(mapDispatchToProps)(withRouter(BgVideoModal));
