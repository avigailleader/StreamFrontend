import React from 'react'
import './body.css'
import Viewers from "./viewers/Viewers";
import MyChats from "./chat/myChats";
import { Button, Modal } from 'react-bootstrap';
import OptionsModal from '../components/conversation/modals/OptionsModal'

const body = () => {
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
                        <div>
                           <OptionsModal visibleOptionsModal={true}></OptionsModal>

                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default body;
