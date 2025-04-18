import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Enter search term or video ID"
        className="mr-2"
        value={query}
        onChange={handleChange}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}

export default SearchBar;
