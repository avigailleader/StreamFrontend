import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './body.css'
import Viewers from "./Viewers";
import MyChats from "./myChats";
import img from '../../assets/img.png'
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

                    </div>

                    {/* <img style={{ width: '100%', height: '' }} src={img}></img> */}
                </div>


            </div>
        </div>
    )
}

export default body;
