import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './Components/Headers/Header';
import MainPages from './Components/Mainpages/Pages'

function App() {
  return (

    <DataProvider>
      <Router>
        <div className='App'>
          <Header />

          <Routes>
            <Route path='*' element={MainPages} />
          </Routes>

        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
