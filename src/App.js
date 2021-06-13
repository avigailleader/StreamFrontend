
import './App.css';
import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store'
import Routes from './components/route'
import Body from './components/chat/body'
function App() {
  return (
    <Provider store={store}>
      <Routes></Routes>
      <Body></Body>
    </Provider>

  )

}

export default App

