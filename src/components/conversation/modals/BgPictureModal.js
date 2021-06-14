import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { BsChevronLeft } from 'react-icons/bs';
import { actions } from '../../../redux/actions';
// import * as uploadBackgroundImages from '../../../assets/uploadBackGroundImg'
import './modals.css'

const importAll = require =>
    require.keys().reduce((acc, next) => {
        acc[next.replace("./", "")] = require(next);
        return acc;
    }, {});

const uploadBackgroundImages = importAll(
    require.context("../../../assets/uploadBackGroundImg", false, /\.(png|jpe?g|svg)$/)
);
const mapStateToProps = (state) => {
    return {
        currentUser: state.generalReducer.currentUser,
        backGroundImg: state.generalReducer.backGroundImg
    };
}

const mapDispatchToProps = (dispatch) => ({
    uploadImg: (urlInput) => dispatch(actions.uploadImg(urlInput))

});

function BgPictureModal(props) {

    const { visibleBgPictureModal } = props;
    const { setVisibleBgPictureModal, setVisibleUploadModal } = props;
    const [urlInput, setUrlInput] = useState(uploadBackgroundImages["bg1.jpg"].default);
    const { uploadImg } = props;

    const images = [
        { id: 1, src: uploadBackgroundImages["bg1.jpg"].default },
        { id: 2, src: uploadBackgroundImages["bg2.jpg"].default },
        { id: 3, src: uploadBackgroundImages["bg3.jpg"].default },
        { id: 4, src: uploadBackgroundImages["bg4.jpeg"].default },
        { id: 5, src: uploadBackgroundImages["bg5.jpg"].default },
        { id: 6, src: uploadBackgroundImages["bg6.jpg"].default },
        { id: 7, src: uploadBackgroundImages["bg4.jpeg"].default },
        { id: 8, src: uploadBackgroundImages["bg5.jpg"].default },
        { id: 9, src: uploadBackgroundImages["bg6.jpg"].default },
        { id: 10, src: uploadBackgroundImages["bg6.jpg"].default },
        { id: 11, src: uploadBackgroundImages["bg4.jpeg"].default },
        { id: 12, src: uploadBackgroundImages["bg5.jpg"].default },
        { id: 13, src: uploadBackgroundImages["bg6.jpg"].default },
    ];

    const handleClose = () => {
        setVisibleBgPictureModal(false);
        uploadImg(urlInput)
    }

    const goUploadModal = () => {
        setVisibleBgPictureModal(false);
        setVisibleUploadModal(true);
    }

    //Function To UploadImg
    const uploadHandler = (event) => {
        setUrlInput(event.target.src)
        console.log('urlInput', urlInput)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Modal size="md" show={visibleBgPictureModal} onHide={handleClose} className="modalDiv">
                    <div size="md" className="upBorderColor"></div>
                    <div className="row">
                        <BsChevronLeft onClick={goUploadModal} className="col-1 lastModalIcon m-3 x"></BsChevronLeft>
                        <MdClose onClick={handleClose} className="x col-1 offset-9 mt-3" />
                    </div>
                    <Modal.Body className="bgPictureModalBody" >
                        <div className="d-flex justify-content-center">
                            <img className="imgToUpload" src={urlInput}></img>
                        </div>
                        <hr></hr>
                        <div className="backGroundsScrollDiv">
                            {/* <img src="uploadBackgroundImages.bg1"></img> */}
                            {images.map((src, i) => <img type="Button" accept="url" className="imgBackGround col-3" key={i} src={src.src} onClick={uploadHandler} />)}
                        </div>

                        <Button className="buttonBackGround mt-4" variant="secondary" onClick={handleClose}>Save</Button>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BgPictureModal));
