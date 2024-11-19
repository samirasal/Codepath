import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

function PostDetails({ posts, setPosts, userId }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));
  const post = posts[postIndex];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), { userId, text: comment }],
    };
    updatePostInState(updatedPost);
    setComment("");
  };
  

  const updatePostInState = (updatedPost) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex] = updatedPost;
    setPosts(updatedPosts);
  };

  const handleUpvote = () => {
    const updatedPost = { ...post, upvotes: post.upvotes + 1 };
    updatePostInState(updatedPost);
  };

  const handleEdit = () => {
    const newTitle = prompt("Edit Title:", post.title);
    const newContent = prompt("Edit Content:", post.content);
    if (newTitle !== null && newContent !== null) {
      const updatedPost = { ...post, title: newTitle, content: newContent };
      updatePostInState(updatedPost);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter((p) => p.id !== parseInt(id));
      setPosts(updatedPosts);
      navigate("/");
    }
  };
  const handleRepost = () => {
    const repost = {
      id: Date.now(),
      userId,
      title: `Repost: ${post.title}`,
      content: post.content,
      imageUrl: post.imageUrl,
      upvotes: 0,
      createdAt: new Date(),
      comments: [],
      repostedFrom: post.id,
    };
    setPosts([repost, ...posts]);
    navigate("/");
  };

  if (!post) return <p>Post not found!</p>;

  const referencedPost = post.repostedFrom
  ? posts.find((p) => p.id === post.repostedFrom)
  : null;


  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p>Posted by: {post.userId}</p>
      <p>Created: {post.createdAt.toLocaleString()}</p>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      {post.videoUrl && (
  <div className="video-container">
    <iframe
      src={post.videoUrl.replace("watch?v=", "embed/")} // Convert YouTube links
      title="Video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
)}      <p>Upvotes: {post.upvotes}</p>
      {referencedPost && (
        <div className="referenced-post">
          <h3>Referenced Post:</h3>
          <p>Title: {referencedPost.title}</p>
          <button onClick={() => navigate(`/post/${referencedPost.id}`)}>
            View Original Post
          </button>
        </div>
      )}
      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleRepost}>Repost</button>
      
      <div className="share-buttons">
        <FacebookShareButton url={`https://www.facebook.com/post/${post.id}`} quote={post.title}>
          <button>Share on Facebook</button>
        </FacebookShareButton>
        <TwitterShareButton url={`https://www.x.com/post/${post.id}`} title={post.title}>
          <button>Share on Twitter</button>
        </TwitterShareButton>
        <WhatsappShareButton url={`https://www.whatsapp.com/post/${post.id}`} title={post.title}>
          <button>Share on WhatsApp</button>
        </WhatsappShareButton>
      </div>

      <h3>Comments</h3>
      <ul>
        {(post.comments || []).map((c, index) => (
          <li key={index}>
            <strong>{c.userId}:</strong> {c.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
        Return
      </button>
    </div>
  );
}

export default PostDetails;
