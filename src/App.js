import './App.css';
import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store'
import Routes from './components/routes/route'

const App = () => {
  return (

    <Provider store={store}>
      <Routes></Routes>
    </Provider>

  )

}

export default App

