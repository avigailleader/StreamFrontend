import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch,connect } from 'react-redux'
import './body.css'
import Viewers from "./chat/admin/Viewers";
import MyChats from "./chat/admin/myChats";
import { Button, Modal } from 'react-bootstrap';


const Body = () => {
  
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-end flex-column" style={{ height: "200px" }}>
                        <div className="mb-auto mr-0 mt-0 p-2">
                            <MyChats className="myChat" ></MyChats>
                        </div>
                        <div className="mt-auto mb-0 mr-0 p-2">
                            <Viewers></Viewers>
                        </div>
                       
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Body;
