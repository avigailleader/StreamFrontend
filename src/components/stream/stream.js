import React, { useEffect } from 'react'

import Video from '../video/video'
import UserVideo from '../video/userVideo/userVideo'

import ChatAdmin from '../chat/chatAdmin'
import ChatUser from '../chat/chatUser'

import Viewers from '../chat/admin/Viewers'
export default function Stream(props) {
    useEffect(() => {
        console.log(window.store.getState().convarsetionReducer.chatId)
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-9">
                    {
                        window.location.href.includes("admin") ?
                            <Video {...props} /> :
                            <UserVideo></UserVideo>
                    }

                </div>
                <div className="col-3">
                    <div className="d-flex align-items-end flex-column" style={{ height: "200px" }}>
                        <div className="mb-auto mr-0 mt-0 p-2">
                            {
                                window.location.href.includes("admin") ?
                                    <ChatAdmin></ChatAdmin> :
                                    // <ChatUser></ChatUser>
                                    <iframe src={`https://chat.leader.codes/ruth_hubara/hangout/${window.store.getState().convarsetionReducer.chatId}?jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJHZ2JIV1p6NWxBWnJpdmlpZURXdk40dFE2WmEyIiwiZW1haWwiOiJydXRoaHViYXJhQGdtYWlsLmNvbSIsImlhdCI6MTYyNjE2MTU5N30.R6m78Ygu-k7caTtDS3jNvqh1nenla9uclK3ckhOaWhU"`}
                                    ></iframe>
                            }
                        </div>
                        <div className="mt-auto mb-0 mr-0 p-2">
                            <Viewers></Viewers>
                        </div>

                    </div>
                </div>

            </div>

        </div >



    )
}
