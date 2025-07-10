
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
