import React, { useState, useEffect } from "react";
import VideoList from "./VideoList";
import VideoCard from "./VideoCard";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [searchedVideo, setSearchedVideo] = useState(null);
  const [error, setError] = useState("");
  const [initialQuery, setInitialQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos({});
  }, []);

  const fetchVideos = async ({ query = null, filters = null }) => {
    let path = "/videos";

    if (query && query.length > 0) {
      path += `/search?searchTerm=${query}`;
    }

    // Construct URL path based on selected filters
    filters &&
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          if (path.includes("?")) {
            path += `&${key}=${filters[key]}`;
          } else {
            path += `?${key}=${filters[key]}`;
          }
        }
      });

    // if (hasTextTracks) {
    //   path += query && query.length > 0 ? "&" : "?";
    //   path += "hasTextTracks=true";
    // }

    // if (hasDescription) {
    //   path += query || hasTextTracks ? "&" : "?";
    //   path += "hasDescription=true";
    // }

    const url = `${
      import.meta.env.PROD
        ? "https://brightcove-proxy.onrender.com"
        : "http://localhost:3000"
    }${path}`;

    console.log("Fetching videos from URL:", url); // Debugging line

    try {
      const response = await axios.get(url);
      setVideos(response.data);
      setLoading(false);
      setSearchedVideo(null);
      setError("");
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos.");
      setVideos([]);
      setSearchedVideo(null);
    }
  };

  const searchVideoByIdOrQuery = async ({ idOrQuery, filters }) => {
    setLoading(true);
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
        setLoading(false);
        setVideos([]);
        setError("");
      } catch (error) {
        console.error("Error fetching video by ID:", error);
        setError(`Video with ID "${id}" not found.`);
        setSearchedVideo(null);
        setVideos([]);
      }
    } else {
      // If the input is not a number, treat it as a search query
      fetchVideos({ query: searchTerm, filters });
    }
  };

  const handleTagClick = (tag) => {
    const searchTerm = `${tag},`;
    setInitialQuery(searchTerm);
    const filters = {
      hasTextTracks: false,
      hasDescription: false,
      searchByDescription: false,
      searchByName: false,
      searchByTags: true,
    };
    fetchVideos({ query: searchTerm, filters });
  };

  return (
    <div className="container mt-4">
      <h1>Brightcove Integration POC</h1>
      <SearchBar
        initialQuery={initialQuery}
        onSearch={searchVideoByIdOrQuery}
      />

      {error && <p className="text-danger">{error}</p>}

      {searchedVideo ? (
        <div>
          <h2>Searched Video</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <VideoCard handleTagClick={handleTagClick} video={searchedVideo} />
          )}
        </div>
      ) : (
        <div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <VideoList handleTagClick={handleTagClick} videos={videos} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
