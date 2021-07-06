



import './chat.css'

import Image from 'react-bootstrap/Image'

import ListGroup from 'react-bootstrap/ListGroup';

import $ from 'jquery';
import { Card } from 'react-bootstrap'
import sendMessage from '../../assets/chats&viewers/sendMessage.svg'

import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserChat = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const [input_value, setInput_value] = useState(" ");
    const [message, setMessage] = useState({ 'messageText': input_value })
    const userName = useSelector(state => state.userReducer.userName)
    const [messagesList, setMessagesList] = useState([])
    const addMessage = () => {
        if (!input_value || input_value ===" ") {
            setMessage({ 'messageText': input_value })
        }
        else {
            setMessage(message['messageText'] = input_value)
        }
        setMessagesList(messagesList => messagesList.concat(message))
        $('input').val('')

        send()
    }

    const messageRef = useRef()
    const handleInput = (e) => {
        setInput_value(e.target.value)
    }
    const handleSendMessage = () => {

        socket.emit('send-message', { message, id: Date.now(), userName });
        // setMessage(message['messageText'] = '')
    }
    useEffect(() => {
        console.log("xdcxfc");

        socket.on('send-message-to-all', message => {
            console.log("xdxcdcfcfcfzzs");
            console.log(message);
            setMessage(message)
        });
    }, [])
    const send = () => {

        setInput_value(input_value)
        if (input_value && input_value != '') {
            handleSendMessage(input_value);
            // setInput_value('')
        }

        console.log(message);
        setMessage({})

    }

    return (
        <>


            <div className="chatBox">
                <Card border="light" style={{ width: '19rem', minheight: '19rem' ,height: '46vh'}}>

                    <Card.Title className="cardTitle row" style={{ color: '#D10010' }}>
                        <div className="col-12"> chat with the admin</div>
                    </Card.Title>
                    <div className="linear" > </div>
                    <div className="container-fluid">
                        <Card.Body>

                            {messagesList.map((member, index) => (
                                <div className='row d-flex flex-row'>

                                    <div>{member.messageText}</div>

                                </div>
                            ))}
                        </Card.Body>

                        <div className="mb-2" className="sendMessageWrap">
                            <input id='input' onChange={handleInput} className="form-control" type="text" placeholder="message" className="chatMessage " >
                            </input>
                            <button onClick={addMessage} style={{ float: "right" }}>
                                <img src={sendMessage} style={{ float: "right" }}></img>
                            </button>
                        </div>





                    </div>
                </Card >
            </div>

        </>
    )
}

export default UserChat;
