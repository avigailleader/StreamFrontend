import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../redux/actions/action';
import pouse from "../../assets/Group 21662.svg"
import play from "../../assets/Component 719 – 5.svg"
import playDark from "../../assets/Group 21705.svg"
import { Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import $ from 'jquery'
import { useStopwatch } from 'react-timer-hook';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import redBorder from '../../assets/modal/red border.svg'
import Save from '../../assets/modal/Save.svg'
import dialogNameImg from '../../assets/modal/Dialog Img.svg'
import './SaveVideoModle.css'
const SaveVideoModle = (props) => {
    const dispatch = useDispatch()
    const {setShowModal} = props
    const saveNameVideoRef = useRef()
    const saveNameVideo = (e) => {
        debugger
        dispatch(actions.setVideoLiveName(saveNameVideoRef.current.value))
        saveNameVideoRef.current.value = " "
        setShowModal(false)
    }

    return (

        <div className="row">

            <Dialog
                open={true}
                onClose={true}
                // PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                style={{ borderTop: 'red 18px' }}
            >

                <img src={redBorder} style={{ width: '777px', position: 'absolute', top: '-2px' }}></img>
                <DialogContent style={{ height: '440px', width: '552px', borderTop: 'red' }}>
                    {/* <button style={{ backgroundColor: 'white' }} onClick={handleCloseName}>
                            <img src={Ximg}></img>
                            </button> */}

                    <img src={dialogNameImg} style={{ width: '267px', position: 'absolute', right: '162px', top: '91px' }}></img>
                    <p style={{ position: 'absolute', top: '333px', right: '184px', fontSize: '21px' }}>Enter your live name:</p>
                </DialogContent>
                <DialogActions>
                    <input type="text" ref={saveNameVideoRef} id="input_name_video"
                        style={{
                            top: '374px', width: "38%",
                            height: "6.5%", position: 'absolute', right: '180px', borderColor: "#D10010", borderRadius: '14%', top: '374px'
                        }} placeholder="enter your live name"></input>

                    <button
                        onClick={(e) => { saveNameVideo() }}
                        style={{ backgroundColor: '#D10010', height: '30px', top: '374px', position: 'absolute', right: '162px', borderBottomRightRadius: '14%', borderTopRightRadius: '14%', width: '50px' }}>
                        <img src={Save}
                            style={{ top: '8px', position: 'absolute', width: '20px', right: '13px' }}></img>
                    </button>
                    <label style={{ color: 'red', font: 'bold' }} id="error_valid"></label>
                </DialogActions>
            </Dialog>
        </div >
    );
}
export default SaveVideoModle;

