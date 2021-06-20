
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import './chat.css'
import profil from '../../assets/user.png'
import ListGroup from 'react-bootstrap/ListGroup';
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

            <div className="chatBox">
                <Card border="light" style={{ width: '19rem', minheight: '19rem' }}>


                    <Card.Title className="cardTitle row" style={{ color: '#D10010' }}>
                        <div className="col-12"> My Chats</div>
                    </Card.Title>
                    <div className="linear" > </div>
                    <div className="container-fluid">
                        <Card.Body>
                            <h1>{message}</h1>
                            <button onClick={(e) => shar()} >shar</button>

                            { }
                        </Card.Body>
                        <div className="mb-2">


                        </div>

                    </div>
                </Card >
            </div>
        </>
    )
}

export default ChatAdmin;