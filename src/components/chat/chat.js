
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Chat = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const [input_value, setInput_value] = useState(' ');

    const handleInput = e => {
        setInput_value(e.target.value)
    }
    const handleSendMessage = (text) => {
        debugger
        socket.emit('send-message', { text, id: Date.now() });
    }
    const send = () => {
        debugger
        if (input_value && input_value != '') {
            handleSendMessage(input_value);
            setInput_value('')

        }
    }

    return (
        <>
            <input type="text" onChange={handleInput} value={input_value} ></input>
            <button onClick={send}>Send</button>

        </>
    )
}

export default Chat;