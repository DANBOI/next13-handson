"use client";

import { useState, useEffect } from "react";
import Card from "./Card";

export default function Feed() {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults = allPosts, setSearchedResults] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setAllPosts(data);
    })();
  }, []);

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (post) =>
        //user.username
        regex.test(post.author.username) ||
        regex.test(post.tag) ||
        regex.test(post.content)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // ★debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPosts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex_center">
        <input
          type="text"
          placeholder="Search for a tag, a word or a user"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* Posts list */}
      <div className="mt-16 post_layout">
        {searchedResults.map((post) => (
          <Card
            userId={post.author._id.toString()}
            key={post._id.toString()}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
}
