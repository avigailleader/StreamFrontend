import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import Routes from './components/route'
function App() {
  return (
    <Provider store={store}>
      {/* <StartVideo></StartVideo> */}
      <Routes></Routes>
    </Provider>

  );
}

export default App;
