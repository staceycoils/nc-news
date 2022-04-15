import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import Articles from './components/Articles';
import Article from './components/Article';
import { Topics } from './components/Topics';
import TopicSubmit from './components/TopicSubmit';
import CommentSubmit from './components/CommentSubmit';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';

function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:article_id" element={<Article />} />
              <Route path="/articles/:article_id/submit" element={<CommentSubmit />} />
            <Route path="/topics" element={<Topics />} />
              <Route path="/topics/submit" element={<TopicSubmit />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
