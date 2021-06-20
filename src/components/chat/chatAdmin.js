
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const ChatAdmin = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const [message, setMessage] = useState('')
    useEffect(() => {
        socket.on('message-to-admin', message => {
            debugger
            // console.log(message);
            setMessage(message);
        });
        socket.on('send-message-to-all', message => {
            console.log("xdxcdcfcfcfzzs");
            console.log(message);
        });
    }, [])
    const shar = () => {
        debugger
        socket.emit('send-message-to-all', { message });

    }

    return (
        <>
            <h1>{message}</h1>
            <button onClick={(e) => shar()} >shar</button>

        </>
    )
}

export default ChatAdmin;