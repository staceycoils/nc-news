import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import Articles from './components/Articles';
import {Topics} from './components/Topics';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/topics" element={<Topics />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
