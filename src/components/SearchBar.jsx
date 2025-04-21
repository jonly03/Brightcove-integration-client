import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [hasTextTracks, setHasTextTracks] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ idOrQuery: query, hasTextTracks, hasDescription });
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Enter search term or video ID"
        className="mr-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mb-3">
        <Form.Check
          inline
          type="switch"
          id="custom-switch"
          label="Has Text Tracks"
          checked={hasTextTracks}
          onChange={(e) => setHasTextTracks(e.target.checked)}
        />
        <Form.Check
          inline
          type="switch"
          id="custom-switch"
          label="Has Description(s)"
          checked={hasDescription}
          onChange={(e) => setHasDescription(e.target.checked)}
        />
      </div>

      <Button type="submit">Search</Button>
    </Form>
  );
}

export default SearchBar;
