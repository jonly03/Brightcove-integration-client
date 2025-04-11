import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function SearchBar({ onSearch }) {
  const [videoId, setVideoId] = useState("");

  const handleChange = (event) => {
    setVideoId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(videoId);
    setVideoId("");
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Enter Video ID"
        className="mr-2"
        value={videoId}
        onChange={handleChange}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}

export default SearchBar;
