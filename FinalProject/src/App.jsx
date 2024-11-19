import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePostForm from "./Components/CreatePostForm";
import HomeFeed from "./Components/HomeFeed";
import PostDetails from "./Components/PostDetails";
import "./App.css";


function App() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = `user-${Math.floor(Math.random() * 1000000)}`;
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  const addPost = (post) => setPosts([post, ...posts]);

  return (
    <Router>
      <div className="app">
        <h1>Fashion Social</h1>
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
