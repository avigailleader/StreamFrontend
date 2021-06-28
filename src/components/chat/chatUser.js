
// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Card } from 'react-bootstrap'
// import './chat.css'
// import profil from '../../assets/user.png'
// import ListGroup from 'react-bootstrap/ListGroup';
// const ChatUser = () => {
//     const dispatch = useDispatch()
//     const socket = useSelector(state => state.socketReducer.socket)
//     const [input_value, setInput_value] = useState(' ');
//     const [message, setMessage] = useState(' ')

//     const userName = useSelector(state => state.userReducer.userName)
//     useEffect(() => {
//         console.log("xdcxfc");
//         debugger
//         socket.on('send-message-to-all', message => {
//             console.log("xdxcdcfcfcfzzs");
//             console.log(message);
//             setMessage(message)
//         });
//     }, [])
//     const messageRef = useRef()
//     const handleInput = e => {
//         setInput_value(e.target.value)
//     }
//     const handleSendMessage = (text) => {
//         socket.emit('send-message', { text, id: Date.now(), userName });
//     }
//     const send = () => {
//         setInput_value(input_value)
//         if (input_value && input_value != '') {
//             handleSendMessage(input_value);
//             // setInput_value('')
//         }
//     }

//     return (
//         <>

//             <div className="chatBox">
//                 <Card border="light" style={{ width: '19rem', minheight: '19rem' }}>


//                     <Card.Title className="cardTitle row" style={{ color: '#D10010' }}>
//                         <div className="col-12"> My Chats</div>
//                     </Card.Title>
//                     <div className="linear" > </div>
//                     <div className="container-fluid">
//                         <Card.Body>

//                             {
//                                 input_value !== " " ?
//                                     <h1>{input_value}</h1>
//                                     : null
//                             }

//                         </Card.Body>
//                         <div className="mb-2">
//                             <input type="text" onChange={handleInput} ></input>
//                             <button onClick={send}>Send!!!!!!!!!</button>

//                         </div>

//                     </div>
//                 </Card >
//             </div>
//         </>
//     )
// }

// export default ChatUser;



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
    const [message, setMessage] = useState({'messageText':input_value})
    const userName = useSelector(state => state.userReducer.userName)
    const [messagesList, setMessagesList] = useState([])

    const addMessage = () => {
        debugger
        setMessage(message['messageText']=input_value)
        setMessagesList(messagesList => messagesList.concat(message))
        $('input').val('')
        send()
    }

    const messageRef = useRef()
    const handleInput = (e) => {
        setInput_value(e.target.value)
    }
    const handleSendMessage = () => {
        debugger
        socket.emit('send-message', { message, id: Date.now(), userName });
    }
    useEffect(() => {
        console.log("xdcxfc");
        debugger
        socket.on('send-message-to-all', message => {
            console.log("xdxcdcfcfcfzzs");
            console.log(message);
            setMessage(message)
        });
    }, [])
    const send = () => {
        debugger
        setInput_value(input_value)
        if (input_value && input_value != '') {
            handleSendMessage(input_value);
            // setInput_value('')
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



                        {/* <div className="mb-2">
                            <input id='input' onChange={} className="form-control" type="text" placeholder="message" className="chatMessage" ></input>
                            {/* onChange={(e) => setMessage(e.target.value)} 
                    
                        <button onClick={addMessage}>Send</button>
                    </div> */}

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
