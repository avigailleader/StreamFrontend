
import './App.css';
import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store'
import Routes from './components/route'
import { Button } from 'react-bootstrap'



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

