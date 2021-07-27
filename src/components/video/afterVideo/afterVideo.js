import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../redux/actions/action"
import './afterVideo.css'

const AfterVideo = (props) => {
    const dispatch = useDispatch()
    const url = useSelector(state => state.convarsetionReducer.url)
    const videoLiveName = useSelector(state => state.convarsetionReducer.videoLiveName)
    const [videoName, setVideoName] = useState(videoLiveName)
    const [description, setDescription] = useState(useSelector(state => state.convarsetionReducer.description))


    const saveNameVideo = (e) => {
        debugger
        dispatch(actions.setVideoLiveName(videoName))
        dispatch(actions.setVideoLiveDescription(description))

        dispatch(actions.saveVideo())
        alert("save is sucsess")


    }
    return (<>
        <div className="container" className="whiteBackground">
            <div className="row">
                <div className="col-12 title">Video Editor</div></div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 ">
                    <div >
                        <video controls className="localVideo1" height="100%" width="100%" autoPlay src={url}  >
                        </video>
                        <input className="videoNameInput" type="text" placeholder="Video Name" onChange={(e) => setVideoName(e.target.value)}></input>
                        <div className="videoForm form-group">
                            <textarea placeholder="Lesson Description" className=" videoNameInput " rows="5" id="comment" onChange={(e) => setDescription(e.target.value)}></textarea>
                            <button className="whiteButton"></button>
                            <button className="redButton" onClick={saveNameVideo}></button>

                        </div>
                    </div>
                </div>
                <div className="col-3"></div>

            </div>
        </div>


        <div></div>
    </>)

}
export default AfterVideo