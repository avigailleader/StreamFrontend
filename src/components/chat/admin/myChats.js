
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../chat.css'
// import Image from 'react-bootstrap/Image'
import profil from '../../../assets/chats&viewers/user.png'
import share from '../../../assets/chats&viewers/share.svg'
import ListGroup from 'react-bootstrap/ListGroup';
// import chevron-left from '../../assets/user.png'
// import chevronLeft from "../../assets/chevron-left.png"


// זה יצטרך לבוא מהרידקס
let members = ['Aviv', 'Shay', 'Oded']
let messages = ['Thanks,', 'What a nice lecture!', 'hoooo']

const MyChats = () => {
 
    const [shareMsg, setShareMsg] = useState(false)

    
    const shareMessage = () => {
        setShareMsg(true)

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
                        {members.map((member, index) => (
                            <div className='row d-flex flex-row'>
                                <img src={profil}
                                    className=' col-4 profil-img'
                                    onMouseOver={e => { (e.currentTarget.src = share) }}
                                    onMouseOut={e => (e.currentTarget.src = profil)}
                                    onClick={(e) => shareMessage()}
                                />


                                <div className='col-8'>
                                    <div><b>{member}</b></div>
                                    <div>  {messages[index]}</div>

                                </div>
                            </div>
                        ))}
                    </Card.Body>
                    <div className="mb-2">
                        <input className="form-control" type="text" placeholder="message" className="chatMessage"></input>
                        {/* <img src={chevronLeft}></img> */}
                    </div>

                </div>
            </Card >
        </div>
    )
}

export default MyChats;