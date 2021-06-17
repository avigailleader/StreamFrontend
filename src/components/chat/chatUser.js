
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const ChatUser = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const [input_value, setInput_value] = useState(' ');
    const [message, setMessage] = useState(' ')

    const messageRef = useRef()
    const handleInput = e => {
        setInput_value(e.target.value)
    }
    const handleSendMessage = (text) => {
        debugger
        socket.emit('send-message', { text, id: Date.now() });

    }
    const send = () => {
        debugger
        setInput_value(messageRef.current.value)
        if (input_value && input_value != '') {
            handleSendMessage(input_value);
            setInput_value('')

            socket.on('message-to-admin', message => {
                console.log("שששששששששששששששששששש");
                setMessage(message);
            });
        }

        console.log(message);

    }

    return (
        <>
            {
                message !== ' ' ?
                    <h1>{message}</h1>
                    : null
            }
            <input type="text" ref={messageRef} onChange={handleInput} value={input_value} ></input>
            <button onClick={send}>Send</button>

        </>
    )
}

export default ChatUser;