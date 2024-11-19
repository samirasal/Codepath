import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePostForm({ addPost, userId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addPost({
        id: Date.now(),
        userId,
        title,
        content,
        imageUrl,
        upvotes: 0,
        createdAt: new Date(),
        comments: [],
        repostedFrom: null,
      });
      setTitle("");
      setContent("");
      setImageUrl("");
      navigate("/");
    }
  };

  return (
    <div className="create-post-form">
      <h3>Create a New Post</h3>
      <h4>Share the latest fashion insights and sustainability initiatives!</h4>
    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Additional content (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
      type="url"
      placeholder="Video URL (optional)"
      value={videoUrl}
      onChange={(e) => setVideoUrl(e.target.value)}
    />
    
      <button type="submit">Create Post</button>
    </form>
    </div>
  );
}

export default CreatePostForm;
