import React, { useState } from "react";
import PostCard from "./PostCard";

function HomeFeed({ posts }) {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "upvotes") return b.upvotes - a.upvotes;
    return b.createdAt - a.createdAt;
  });

  const filteredPosts = sortedPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-feed">
      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="sorting">
        <button onClick={() => setSortBy("createdAt")}>Sort by Time</button>
        <button onClick={() => setSortBy("upvotes")}>Sort by Upvotes</button>
      </div>
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default HomeFeed;
