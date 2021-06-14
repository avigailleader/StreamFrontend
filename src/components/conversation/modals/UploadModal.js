import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap'
import { MdClose } from "react-icons/md";
import { actions } from '../../../redux/actions';
import blurGood from '../../../assets/blurGood.jpg';
import libaryGood from '../../../assets/libaryGood.jpg';
import uploadGood from '../../../assets/uploadGood.jpg';
import noneGood from '../../../assets/noneGood.jpg';
import iconAdd from '../../../assets/iconAdd.png';
import iconlibary from '../../../assets/iconlibary.png';
import iconlur from '../../../assets/iconlur.png';
import iconNone from '../../../assets/iconNone.png';
import personPicture from '../../../assets/personPicture.png';

import './modals.css'

const mapStateToProps = (state) => {
    return {

        localVideo: state.socketReducer.localVideo,
        localStream: state.socketReducer.localStream,
        currentUser: state.generalReducer.currentUser,
        backGroundImg: state.generalReducer.backGroundImg
    };
}

const mapDispatchToProps = (dispatch) => ({
    setBackGroundImg: (img) => dispatch(actions.setBackGroundImg(img)),
    uploadImg: (urlInput) => dispatch(actions.uploadImg(urlInput)),
});

function UploadModal(props) {

    const { visibleUploadModal } = props;
    const { setVisibleUploadModal, setVisibleBgVideoModal, uploadImg, setVisibleBgPictureModal } = props;

    const [showBackGroundModal, setshowBackGroundModal] = useState(false);
    const [opacityBackGround, setOpacityBackGround] = useState("");
    const [openUpload, setOpenUpload] = useState(false);

    const handleClose = () => setVisibleUploadModal(false);
    const [urlInput, setUrlInput] = useState("")

    const blurRef = useRef();
    const libraryRef = useRef();
    const uploadRef = useRef();
    const noneRef = useRef();

    useEffect(() => {
        setOpacityBackGround("imgNone");
        // noneRef.current.style.border = "2px solid #696969"
    }, [])

    const openBackGroundModal = () => {
        setVisibleUploadModal(false);
        setVisibleBgPictureModal(true)
    }

    const videoBgFunc = () => {
        // setVisibleUploadModal(false);
        // setVisibleBgVideoModal(true);
    }

    //Function To UploadImg
    const uploadHandler = (event) => {
        var fileReader = new FileReader()
        fileReader.onload = ((e) => {
            setUrlInput(e.target.result);
        })
        setUrlInput(fileReader.readAsDataURL(event.target.files[0]))
        uploadImg(urlInput);
    }

    return (
        <div className="container">
            <Modal size="md" className="modalDiv" show={visibleUploadModal} onHide={handleClose}>
                <div closeButton>
                    <div size="md" className="upBorderColor"></div>
                    <div className="row">
                        <MdClose onClick={handleClose} className="x col-2 offset-10 mt-3" />
                    </div>
                    <div className="uploadLinksDiv col-8 offset-2 mt-4 mb-3">
                        <a onClick={openBackGroundModal} className="linkBackGround">BackGround Picture</a>
                        <a onClick={videoBgFunc} className="linkBackGround ml-5">BackGround Video</a>
                    </div>
                    <div className="row">
                        <img className="col-8 offset-2 p-2 " src={personPicture} id={opacityBackGround}></img>
                        <audio width="320" height="240" autoplay muted> </audio>
                    </div>
                </div>
                <Modal.Body  >
                    <div className="row">
                        <div className="bgOptionsDiv col-8 offset-2">
                            <div className="cardModall" ref={blurRef} onClick={() => { setOpacityBackGround("imgBlor") }}
                                style={{ border: "1px solid #696969" }}>
                                <div className="uploadIconDiv">
                                    <img src={iconlur} className="imgCardBlur" />
                                </div>
                                <div className="greyDiv">
                                    <span className="wordCardBlur">Blur</span>
                                </div>
                            </div>
                            <div className="cardModall" ref={libraryRef} onClick={openBackGroundModal} style={{ border: "1px solid #696969" }}>
                                {/* <div className="row">
                                    <div className="col-5">
                                        <img src={iconlibary} className="imgCard" />
                                    </div>
                                </div>
                                <div className="row greyDiv">
                                    <span className="wordCard">Libary</span>
                                </div> */}
                            </div>

                            <div className="cardModall">
                                {/* <label ref={uploadRef} style={{ border: "1px solid #696969" }}>
                                    <input type="file" name="file" accept="url" onChange={uploadHandler} className="iputUpload"></input>
                                    <div className="row ">
                                        <div className="col-4">
                                            <img src={iconAdd} className="imgCard" />
                                        </div>
                                    </div>
                                    <div className="row greyDiv">
                                        <span className="wordCard">Upload</span>
                                    </div>
                                </label> */}
                            </div>
                            <div className="cardModall lastCardModall" ref={noneRef} onClick={() => { setOpacityBackGround("imgNone") }}
                                style={{ border: "1px solid #696969" }}
                            >
                                {/* <div className="row">
                                    <div className="col-5">
                                        <img src={iconNone} className="imgCard" />
                                    </div>
                                </div>
                                <div className="row greyDiv">
                                    <span className="wordCard">None</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <Button className="buttonBackGround" onClick={handleClose}>Save</Button>
                </Modal.Body>
            </Modal>
        </div >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UploadModal));

