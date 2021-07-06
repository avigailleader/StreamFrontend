
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
import { useRef } from 'react'

const MyChats = () => {
    const socket = useSelector(state => state.socketReducer.socket)
    const [messageToShare, setMessageToShare] = useState({})
    const [messagesList, setMessagesList] = useState([])
    const userName = useSelector(state => state.userReducer.userName)
    const [input_value, setInput_value] = useState(' ');
    const imgRef = useRef(<img src={profil}></img>)
    const divRef = useRef()
    useEffect(() => {
        socket.on('message-to-admin', message => {
            console.log(message);
            // let i = 0

            // const m = { message: message, i: i }
            setMessagesList(messagesList => messagesList.concat({ 'messageText': message }))
            // setMessage(message)
        });

    }, [])
    const shareMessage = (e) => {

        console.log(e);
        // let div = document.getElementById('showShare')
        // div.innerHTML = e.innerHTML
        // console.log(e.innerHTML);
        // setMessageToShare(messageToShare.userImg = e.children[0])
       
        setMessageToShare((messageToShare.userImg= e.children[0].outerHTML))
        setMessageToShare(messageToShare.dataDiv =e.children[1].innerText)
        socket.emit('send-message-to-all', { messageToShare });

        setMessageToShare({})

    }
    const onMouseOver = (e) => {
        console.log(e);
    }
    const handleInput = (e) => {
        setInput_value(e.target.value)
    }

    // const send = () => {
    //       
    //     // setInput_value(input_value)
    //     if (input_value && input_value != '') {
    //         handleSendMessage(input_value);
    //         // setInput_value('')
    //     }

    //     console.log(input_value);


    const handleSendMessage = (text) => {

        socket.emit('send-message', { text, id: Date.now(), userName });
    }

    const addMessage = () => {

        // const addMessage = () => {

        //     setMessagesList(messagesList => messagesList.concat({img:imgRef,message:input_value}))
        //     $('input').val('')
        //     send()

        // }
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
                            <div className='row d-flex flex-row member'

                                onClick={(e) => shareMessage(e.currentTarget)}>
                                <img ref={imgRef} src={profil}
                                    className=' col-4 profil-img'
                                    onMouseOver={e => { (e.currentTarget.src = share) }}
                                    onMouseOut={e => (e.currentTarget.src = profil)}
                                // onClick={(e) => shareMessage()}
                                />

                                <div className='col-8'>
                                    <div ><b>{message.messageText}</b></div>
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
            <div id="showShare" ></div>
        </div >
    )
}

export default MyChats;

// {members.map((member, index) => (
//     <div className='row d-flex flex-row member'>
//         <h1>{index}</h1>
//         <img onClick={share()} src={profil} className=' col-4 profil-img' rounded ></img>
//         <div className='col-8'>
//             <div>  {messages[index]}</div>
//             <div>{message}</div>
//         </div>


//     </div>
// ))}