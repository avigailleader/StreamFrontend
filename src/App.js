
import Body from './components/chat/body'
import './App.css';
import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store'
import {Button} from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'
import StartVideo from './components/startVideo'

 
const App = () => {
  return (

    <Provider store={store}>

      <div className="App"  style={{ backgroundColor: "gray", height: "700px" }}>
        <Button className="btn-primary">ghjg</Button>
        <header className="App-header">
          <Body />
          <StartVideo style={{position: "absolute", right: "0px"}}></StartVideo>

        </header>
      </div>
    </Provider>

  )

}

export default App

