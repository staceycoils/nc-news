import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import Articles from './components/Articles';
import Article from './components/Article';
import ArticleSubmit from './components/ArticleSubmit';
import { Topics } from './components/Topics';
import TopicSubmit from './components/TopicSubmit';
import CommentSubmit from './components/CommentSubmit';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Users from './components/Users';
import User from './components/User';
import Login from './components/Login';
import MissingPage from './components/MissingPage';

function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/submit" element={<ArticleSubmit />} />
            <Route path="/articles/:article_id" element={<Article />} />
              <Route path="/articles/:article_id/submit" element={<CommentSubmit />} />
            <Route path="/topics" element={<Topics />} />
              <Route path="/topics/submit" element={<TopicSubmit />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
