import React, { useState, useEffect } from "react";
import VideoList from "./VideoList";
import VideoCard from "./VideoCard";
import SearchBar from "./SearchBar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [searchedVideo, setSearchedVideo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async (query = null) => {
    let path = "/videos";
    if (query) {
      path += `/search?q=${query}`;
    }

    const url = `${
      import.meta.env.PROD
        ? "https://brightcove-proxy.onrender.com"
        : "http://localhost:3000"
    }${path}`;
    try {
      const response = await axios.get(url);
      setVideos(response.data);
      setSearchedVideo(null);
      setError("");
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos.");
      setVideos([]);
      setSearchedVideo(null);
    }
  };

  const searchVideoByIdOrQuery = async (idOrQuery) => {
    if (!isNaN(idOrQuery.trim())) {
      const id = idOrQuery.trim();
      try {
        const response = await axios.get(
          `${
            import.meta.env.PROD
              ? "https://brightcove-proxy.onrender.com"
              : "http://localhost:3000"
          }/videos/${id}`
        );
        setSearchedVideo(response.data);
        setVideos([]);
        setError("");
      } catch (error) {
        console.error("Error fetching video by ID:", error);
        setError(`Video with ID "${id}" not found.`);
        setSearchedVideo(null);
        setVideos([]);
      }
    } else {
      fetchVideos(idOrQuery);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Brightcove Integration POC</h1>
      <SearchBar onSearch={searchVideoByIdOrQuery} />

      {error && <p className="text-danger">{error}</p>}

      {searchedVideo ? (
        <div>
          <h2>Searched Video</h2>
          <VideoCard video={searchedVideo} />
        </div>
      ) : (
        <VideoList videos={videos} />
      )}
    </div>
  );
}

export default App;
