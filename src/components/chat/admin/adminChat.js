import React from 'react'
import { Card } from 'react-bootstrap'
import '../chat.css' 
// import Image from 'react-bootstrap/Image'
import profil from '../../../assets/chats&viewers/user.png'
import ListGroup from 'react-bootstrap/ListGroup';
import MyChat from './myChats'
import Viewers from './Viewers'


const Admin = () => {

    return (
        <div className="chatBox">
          <MyChat />
          <Viewers />
        </div>
    )
}

export default Admin;