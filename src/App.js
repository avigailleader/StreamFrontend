import './App.css';
import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store'
<<<<<<< HEAD
import Routes from './components/route'
import { Button } from 'react-bootstrap'

=======
import { Button } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'
import StartVideo from './components/stream'
import Chat from './components/chat/chatUser'
import ChatAdmin from './components/chat/chatAdmin'

import Routes from './components/routes/route'
>>>>>>> 84b35988e05d13765704c5bf33ff3bfd7ee88688

const App = () => {
  return (

    <Provider store={store}>
      <div className="App" style={{ backgroundColor: "gray", height: "700px" }}>
        <header className="App-header">
        </header>
        <Routes></Routes>

      </div>
    </Provider>

  )

}

export default App



