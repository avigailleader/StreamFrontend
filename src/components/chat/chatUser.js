
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const ChatUser = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const [input_value, setInput_value] = useState(' ');
    const [message, setMessage] = useState(' ')

    const userName = useSelector(state => state.userReducer.userName)
    useEffect(() => {
        console.log("xdcxfc");
        debugger
        socket.on('send-message-to-all', message => {
            console.log("xdxcdcfcfcfzzs");
            console.log(message);
            setMessage(message)
        });
    }, [])
    const messageRef = useRef()
    const handleInput = e => {
        setInput_value(e.target.value)
    }
    const handleSendMessage = (text) => {
        socket.emit('send-message', { text, id: Date.now(), userName });
    }
    const send = () => {
        setInput_value(input_value)
        if (input_value && input_value != '') {
            handleSendMessage(input_value);
            setInput_value('')
        }
    }

    return (
        <>
            {
                message !== ' ' ?
                    <h1>{message}</h1>
                    : null
            }
            <input type="text" onChange={handleInput} ></input>
            <input type="text" name="name" />
            <button onClick={send}>Send!!!!!!!!!</button>

        </>
    )
}

export default ChatUser;