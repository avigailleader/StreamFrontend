
import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import './chat.css'
import './admin/myChats.css'
import $ from 'jquery'
// import Image from 'react-bootstrap/Image'
import profil from '../../assets/chats&viewers/user.png'
import share from '../../assets/chats&viewers/share.svg'
import { useDispatch, useSelector } from 'react-redux'
import sendMessage from '../../assets/chats&viewers/sendMessage.svg'


const MyChats = () => {
    const socket = useSelector(state => state.socketReducer.socket)
    const [message, setMessage] = useState('')
    const [messagesList, setMessagesList] = useState([])
    const userName = useSelector(state => state.userReducer.userName)
    const [input_value, setInput_value] = useState(' ');

    useEffect(() => {
        socket.on('message-to-admin', message => {
            let i = 0
            // debugger
            const m = { message: message, i: i }
            setMessagesList(messagesList => messagesList.concat(m))
            setMessage(message)
        });
        socket.on('send-message-to-all', message => {
            console.log("xdxcdcfcfcfzzs");
            console.log(message);
        });

    }, [])
    const shareMessage = () => {
        debugger
        socket.emit('send-message-to-all', { message });

    }
    const onMouseOver = (e) => {
        console.log(e);
    }
    const handleInput = (e) => {
        setInput_value(e.target.value)
    }

    const send = () => {
        debugger
        // setInput_value(input_value)
        if (input_value && input_value != '') {
            handleSendMessage(input_value);
            // setInput_value('')
        }

        console.log(message);

    }
    const handleSendMessage = (text) => {
        debugger
        socket.emit('send-message', { text, id: Date.now(), userName });
    }

    const addMessage = () => {

        setMessagesList(messagesList => messagesList.concat(input_value))
        $('input').val('')
        send()

    }



    return (
        <div className="chatBox">
            <Card border="light" style={{ width: '19rem', minheight: '19rem' }}>


                <Card.Title className="cardTitle row" style={{ color: '#D10010' }}>
                    <div className="col-12"> My Chats</div>
                </Card.Title>
                <div className="linear" > </div>
                <div className="container-fluid">
                    <Card.Body>
                        {messagesList.map((message, index) => (
                            <div className='row d-flex flex-row'>
                                <img src={profil}
                                    className=' col-4 profil-img'
                                    onMouseOver={e => { (e.currentTarget.src = share) }}
                                    onMouseOut={e => (e.currentTarget.src = profil)}
                                    onClick={(e) => shareMessage()}
                                />

                                <div className='col-8'>
                                    <div ><b>{message}</b></div>
                                </div>
                            </div>
                        ))}
                    </Card.Body>

                    {/* <div className="mb-2" className="sendMessageWrap">
                        <input id='input' onChange={handleInput} className="form-control" type="text" placeholder="message" className="chatMessage " >

                        </input>
                       
                        <button onClick={addMessage} style={{ float: "right" }}>
                          
                            <img src={sendMessage} style={{ float: "right" }}></img>
                        </button>
                    </div> */}

                    <div className="mb-2">
                        {/* <input className="form-control" type="text" placeholder="message" className="chatMessage"></input> */}
                        {/* <img src={chevronLeft}></img> */}
                    </div>

                </div>
            </Card >
        </div>
    )
}

export default MyChats;