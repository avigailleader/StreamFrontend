



import './chat.css'

import Image from 'react-bootstrap/Image'

import ListGroup from 'react-bootstrap/ListGroup';

import $ from 'jquery';
import { Card } from 'react-bootstrap'
import sendMessage from '../../assets/chats&viewers/sendMessage.svg'
import Picker from 'emoji-picker-react';

import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserChat = () => {
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socketReducer.socket)
    const [input_value, setInput_value] = useState(" ");
    const [message, setMessage] = useState({ 'messageText': input_value })
    const userName = useSelector(state => state.userReducer.userName)
    const [messagesList, setMessagesList] = useState([])
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showEmogi, setShowEmogi] = useState(false)
    const [emujistr,setEmujistr]=useState("&#128512;")
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setInput_value((a) => a += emojiObject.emoji)

    };
    const addMessage = () => {
        if (!input_value || input_value === " ") {
            setMessage({ 'messageText': input_value })
        }
        else {
            setMessage(message['messageText'] = input_value)
        }
        setMessagesList(messagesList => messagesList.concat(message))
        // $('input').val('')
        setInput_value(" ")

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
    document.addEventListener("keypress", function (e) {
        debugger
        if (!e) e = window.event;
        if (e.keyCode == '13') {


            e.preventDefault();
            addMessage()
            return false;




        }
    })




    const addEimogi = () => {
        debugger
        setShowEmogi(!showEmogi)
    }

    return (
        <>
            <div className="chatBox">
                <Card border="light" className="cardMessage" style={{ width: '19rem', minheight: '19rem', height: '46vh' }}>

                    <Card.Title className="cardTitle row" style={{ color: '#D10010' }}>
                        <div className="col-12"> chat with the admin</div>
                    </Card.Title>
                    <div className="linear" > </div>
                    <div className="container-fluid inputMes">
                        <Card.Body className="scrollMes">

                            {messagesList.map((member, index) => (
                                <div className='row d-flex flex-row '>

                                    <div className="underscroll">{member.messageText}</div>

                                </div>
                            ))}
                        </Card.Body>
                        <div>
                                {
                                    showEmogi === true ?
                                        <Picker disableSearchBar={true} onEmojiClick={onEmojiClick} />
                                        : null
                                }

                            </div>
                        <p onClick={(e) => addEimogi()}
                            
                            >&#128512;</p>
                              <button onClick={addMessage} style={{ float: "right" }}>
                                  <img src={sendMessage} style={{ float: "right" }}></img>
                              </button>

                        <div className="mb-2 inputMassage" className="sendMessageWrap">
                            <input id='input' onChange={handleInput} value={input_value} className="form-control input" type="text" placeholder="message" className="chatMessage " >
                            </input>
                            
                            
                          
                        </div>





                    </div>
                </Card >
            </div>

        </>
    )
}

export default UserChat;
