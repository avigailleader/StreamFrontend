import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../redux/actions/action"


const AfterVideo=(props)=>{
    const dispatch = useDispatch()
    const url= useSelector(state => state.convarsetionReducer.url)
    const videoLiveName=useSelector(state => state.convarsetionReducer.videoLiveName)
    const [videoName,setVideoName]=useState(videoLiveName)
   const  updatename=(val)=>{
    setVideoName(val)
    dispatch(actions.setVideoLiveName(videoName))
   }
  
 return(<>
 <div>AfterVideo work</div>
 <video id="localVideo" height="100%" width="100%" muted={true} autoPlay src={url} controls >

</video>
<div></div>
 <input type="text" placeholder="upDate name video" onChange={(e)=>updatename(e.target.value)}  value={videoName}></input></>)

}
export default AfterVideo