
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const ChatAdmin = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const [message, setMessage] = useState('')

    useEffect(() => {
        socket.on('message-to-admin', message => {
            console.log(message);
            setMessage(message);
        });
    }, [])


    return (
        <>
            <h1>{message}</h1>

        </>
    )
}

export default ChatAdmin;