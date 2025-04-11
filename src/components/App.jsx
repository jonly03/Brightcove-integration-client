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

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/videos");
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

  const searchVideoById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/videos/${id}`);
      setSearchedVideo(response.data);
      setVideos([]);
      setError("");
    } catch (error) {
      console.error("Error fetching video by ID:", error);
      setError(`Video with ID "${id}" not found.`);
      setSearchedVideo(null);
      setVideos([]);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Brightcove Integration POC</h1>
      <SearchBar onSearch={searchVideoById} />

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
