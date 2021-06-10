
import Body from './components/chat/body'
import './App.css';
import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store'
import StartVideo from './components/startVideo'
const App = () => {
  return (
    <Provider store={store}>

      <div className="App" style={{ backgroundColor: "black", height: "700px" }}>
        <header className="App-header">
          <Body />
          <StartVideo></StartVideo>

        </header>
      </div>
    </Provider>

  )

}

export default App

