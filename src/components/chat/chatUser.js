
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import './chat.css'
import profil from '../../assets/chats&viewers/user.png'
import ListGroup from 'react-bootstrap/ListGroup';
const ChatUser = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const [input_value, setInput_value] = useState(' ');
    const [message, setMessage] = useState(' ')
    let flag = true

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
            flag = true
            handleSendMessage(input_value);
            // setInput_value('')
        }
    }

    return (
        <>

            <div className="chatBox">
                <Card border="light" style={{ width: '19rem', minheight: '19rem' }}>


                    <Card.Title className="cardTitle row" style={{ color: '#D10010' }}>
                        <div className="col-12"> My Chats</div>
                    </Card.Title>
                    <div className="linear" > </div>
                    <div className="container-fluid">
                        <Card.Body>

                            {
                                flag === true ?
                                    <h1>{input_value}</h1>
                                    : null
                            }

                        </Card.Body>
                        <div className="mb-2">
                            <input type="text" onChange={handleInput} ></input>
                            <button onClick={send}>Send!!!!!!!!!</button>

                        </div>

                    </div>
                </Card >
            </div>
        </>
    )
}

export default ChatUser;