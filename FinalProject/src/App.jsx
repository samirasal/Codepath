import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePostForm from "./Components/CreatePostForm";
import HomeFeed from "./Components/HomeFeed";
import PostDetails from "./Components/PostDetails";
import "./App.css";


function App() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [layout, setLayout] = useState(localStorage.getItem("layout") || "list");

 const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};

const toggleLayout = () => {
  setLayout(layout === 'list' ? 'grid' : 'list');
};

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = `user-${Math.floor(Math.random() * 1000000)}`;
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);
  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  const addPost = (post) => setPosts([post, ...posts]);

  return (
    <Router>
      <div className="preferences">
        <button onClick={toggleTheme}className={theme === "dark" ? "dark-button" : "light-button"}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
        <button onClick={toggleLayout} className={theme === "dark" ? "dark-button" : "light-button"}>
          {layout === 'list' ? 'Switch to Grid Layout' : 'Switch to List Layout'}
        </button>
      </div>
      <div className={`app ${layout}-layout`}>
        <h2>Welcome to Fashion Social</h2>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CreatePostForm addPost={addPost} userId={userId} />
                <HomeFeed posts={posts} />
              </>
            }
          />
          <Route
            path="/post/:id"
            element={<PostDetails posts={posts} setPosts={setPosts} userId={userId} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
