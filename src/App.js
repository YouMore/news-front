import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';
import Header from './components/header/Header.jsx';

function App() {
  return (
    <div>
          <Header/>
    <AppRouter/> 
    </div>

  );
}

export default App;
