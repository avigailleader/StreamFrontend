import React from 'react'

import Video from '../video/video'
import MyChats from '../chat/myChats'
import Viewers from '../chat/Viewers'
export default function Stream(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-9">
                    <Video {...props} />
                </div>
                <div className="col-3">
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
