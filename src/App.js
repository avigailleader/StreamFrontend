import './App.css';
import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store'
import Body from './components/chat/body'
import { Button } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'
import StartVideo from './components/stream'
import Chat from './components/chat/chatUser'
import ChatAdmin from './components/chat/chatAdmin'

import Routes from './components/routes/route'

const App = () => {
  return (

    <Provider store={store}>
      <div className="App" style={{ backgroundColor: "gray", height: "700px" }}>
        <Button className="btn-primary">ghjg</Button>
        <header className="App-header">
          <Body />
        </header>
        <Routes></Routes>
        {
          window.location.href.includes("admin") ?
            <ChatAdmin></ChatAdmin> :
            <Chat></Chat>
        }

      </div>
    </Provider>

  )

}

export default App



