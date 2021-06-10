import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import StartVideo from './components/startVideo'
function App() {
  return (
    <Provider store={store}>
     
      <StartVideo></StartVideo>
    </Provider>

  );
}

export default App;
