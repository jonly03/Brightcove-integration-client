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
    fetchVideos({});
  }, []);

  const fetchVideos = async ({ query = null, hasTextTracks = false }) => {
    let path = "/videos";

    if (query && query.length > 0) {
      path += `/search?searchTerm=${query}`;
    }

    if (hasTextTracks) {
      path += query ? "&" : "?";
      path += "hasTextTracks=true";
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

  const searchVideoByIdOrQuery = async ({ idOrQuery, hasTextTracks }) => {
    const searchTerm = idOrQuery.trim();
    if (searchTerm && searchTerm.length > 0 && !isNaN(searchTerm)) {
      // If the input is a number, treat it as a video ID
      try {
        const response = await axios.get(
          `${
            import.meta.env.PROD
              ? "https://brightcove-proxy.onrender.com"
              : "http://localhost:3000"
          }/videos/${searchTerm}`
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
      fetchVideos({ query: searchTerm, hasTextTracks });
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
