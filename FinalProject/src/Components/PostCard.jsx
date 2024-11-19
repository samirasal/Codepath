import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>Created: {post.createdAt.toLocaleString()}</p>
      <p>Upvotes: {post.upvotes}</p>
      <Link to={`/post/${post.id}`}>View Details</Link>
    </div>
  );
}

export default PostCard;
