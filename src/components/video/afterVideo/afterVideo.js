import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../redux/actions/action"


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
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 ">
                    <div className="diVideo1">
                        <video controls className="localVideo1" height="100%" width="100%" autoPlay src={url}  >
                        </video>
                        <p className="myLabel">update name video</p>
                        <input type="text" placeholder="upDate name video"  onChange={(e) => setVideoName(e.target.value)} value={videoName}></input>
                        <p className="myLabel">description your video</p>
                        <div class="form-group">
                            <label for="comment">UpDate description video:</label>
                            <textarea class="form-control textBox" rows="5" id="comment" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                            <button class="btn btn-primary" onClick={saveNameVideo}></button>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>

            </div>
        </div>


        <div></div>
    </>)

}
export default AfterVideo