import '../chat.css'
import Image from 'react-bootstrap/Image'

import ListGroup from 'react-bootstrap/ListGroup';

import $ from 'jquery';
import { Card } from 'react-bootstrap'


import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserChat = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const [input_value, setInput_value] = useState(' ');
    const [message, setMessage] = useState(' ')

    const [messagesList, setMessagesList] = useState([" "])

    const addMessage = () => {
       
        setMessagesList(messagesList => messagesList.concat(message))
        $('input').val('')
        send()

    }

    const messageRef = useRef()
    // const handleInput = (e) => {
    //     setInput_value(e.target.value)
    // }
    const handleSendMessage = (text) => {
        debugger
        socket.emit('send-message', { text, id: Date.now() });

    }
    const send = () => {
        debugger
        setInput_value(messageRef.current.value)
        if (input_value && input_value != '') {
            handleSendMessage(input_value);
            // setInput_value('')

            socket.on('message-to-admin', message => {
                console.log("שששששששששששששששששששש");
                setMessage(message);
            });
        }

        console.log(message);

    }

    return (
        <>


            <div className="chatBox">
                <Card border="light" style={{ width: '19rem', minheight: '19rem' }}>

                    <Card.Title className="cardTitle row" style={{ color: '#D10010' }}>
                        <div className="col-12"> chat with the admin</div>
                    </Card.Title>
                    <div className="linear" > </div>
                    <div className="container-fluid">
                                            <Card.Body>

                             {messagesList.map((member, index) => (
                        <div className='row d-flex flex-row'>

                            <div>{member}</div>


                        </div>
                    ))}


                        </Card.Body>
                        <div className="mb-2">
                            <input id='input' ref={messageRef} onChange={(e) => setMessage(e.target.value)}  className="form-control" type="text" placeholder="message" className="chatMessage" ></input>
{/* onChange={(e) => setMessage(e.target.value)} */}
{/* value={input_value} */}
                            <button onClick={addMessage}>Send</button>
                        </div>

                    </div>
                </Card >
            </div>

            {/* {
                message !== ' ' ?
                    <h1>{message}</h1>
                    : null
            } */}
{/* 
            <input type="text" ref={messageRef} onChange={handleInput} value={input_value} ></input>
            <button onClick={send}>Send</button> */}

        </>
    )
}

export default UserChat;
