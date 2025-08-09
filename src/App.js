
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import { store } from './utils/store';

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <AppRoutes/>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
