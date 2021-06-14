import { Link } from 'react-router-dom';

import RatingStars from '../../general-components/RatingStars';
import { Button, Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

import * as socketService from '../../../services/socket.service';
import './../../general-components/general.css'

function EndConversationModal(props) {

    const { history, visibleEndConversationModal, setVisibleEndConversationModal } = props;

    const handleClose = () => {
        setVisibleEndConversationModal(false);
    };

    const endConversationFunc = () => {
        socketService.hungUpConversation();
        setVisibleEndConversationModal(false);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Modal size="md" className="endConversationModal" show={visibleEndConversationModal} onHide={handleClose}>
                    <div size="md" className="upBorderColor"></div>
                    <div className="row">
                        <MdClose onClick={handleClose} className="x col-2 offset-10 mt-3" />
                    </div>
                    <Modal.Body className="modalBody">
                        <span className="leftMeetingTitle">Are you shure you want to left the call?</span>
                        {/* <br></br><br></br> */}
                        <div className="mt-4 mb-3 d-flex justify-content-center">
                            {/* <button type="button" class="btnEndConversationModal btn btn-sm">Cancel</button> */}
                            <Button className="btnEndConversationModal btnEndCon1" onClick={handleClose} size="sm">Cancel</Button>
                            <Button className="btnEndConversationModal btnEndCon2" onClick={endConversationFunc} size="sm">Finish</Button>
                        </div>

                        {/* <Link to="/lastConversations" className="mt-5">last conversations</Link>
                        <Link to="/" className="mt-5">new conversation</Link> */}
                        {/* <p className="mt-5">How much did you like using our app?</p> */}
                        {/* <RatingStars /> */}
                        {/* <h5 className="mt-5">Thank you for using our app</h5> */}
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button className="buttonBackGround " variant="secondary" onClick={handleClose}>Save</Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
        </div >
    );

    //     return (<
    //             div className="container-fluid" >
    //         <
    //             div className="row" >
    //             <
    //             Modal size="md"
    //                 className="uploadImageModal col-5"
    //                 show={visibleEndConversationModal}
    //                 onHide={handleClose}
    //                 dialogClassName="modalDiv" >
    //                 <
    //             div size="md"
    //                     className="upBorderColor" > < /div> <
    //             div className="row" >
    //                         <
    //                             MdClose onClick={handleClose}
    //                             className="x col-2 offset-10 mt-3" />
    //                         <
    //             /div> <
    //             Modal.Body >
    //                             <
    //             span className="leftMeetingTitle" > Are you shure you want to left the call ? < /span> {/ * < br > < /br > <br></br > * / } <
    //             div className = "mt-3 mb-1" > { /* <button type="button" class="btnEndConversationModal btn btn-sm">Cancel</button> */} <
    //             Button className="btnEndConversationModal1 buttonBackGround"
    //                                     onClick={handleClose}
    //                                     size="sm" > Cancel < /Button> <
    //             Button className=" btnEndConversationModal2 buttonBackGround"
    //                                         onClick={endConversationFunc}
    //                                         size="sm" > Finish < /Button> < /
    //             div >

    //             {
    //                                             /* <Link to="/lastConversations" className="mt-5">last conversations</Link>
    //                                                                     <Link to="/" className="mt-5">new conversation</Link> */
    //                                         } { /* <p className="mt-5">How much did you like using our app?</p> */} { /* <RatingStars /> */} { /* <h5 className="mt-5">Thank you for using our app</h5> */} <
    //             /Modal.Body> {
    //                                             /* <Modal.Footer>
    //                                                                     <Button className="buttonBackGround " variant="secondary" onClick={handleClose}>Save</Button>
    //                                                                 </Modal.Footer> */
    //                                         } <
    //         /Modal> < /
    //         div > <
    //         /div >
    // );
}

export default EndConversationModal;