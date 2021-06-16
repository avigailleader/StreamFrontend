
import './App.css';
import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store'
import Routes from './components/route'
import Body from './components/chat/body'
import { Button } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'
import StartVideo from './components/stream'
import Chat from './components/chat/chat'
const App = () => {
  return (

    <Provider store={store}>
      <div className="App" style={{ backgroundColor: "gray", height: "700px" }}>
        <Button className="btn-primary">ghjg</Button>
        <header className="App-header">
          <Body />
          {/* <StartVideo style={{position: "absolute", right: "0px"}}></StartVideo> */}
        </header>
        {/* <Routes></Routes> */}
        <Chat></Chat>
      </div>
    </Provider>

  )

}

export default App



