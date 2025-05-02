import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function SearchBar({ onSearch, initialQuery }) {
  const [query, setQuery] = useState("");
  const [searchByName, setSearchByName] = useState(false);
  const [searchByDescription, setSearchByDescription] = useState(false);
  const [searchByTags, setSearchByTags] = useState(false);
  const [hasTextTracks, setHasTextTracks] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  useEffect(() => {
    if (initialQuery && initialQuery.length > 0) {
      setQuery(initialQuery);

      if (initialQuery.includes(",")) {
        setSearchByTags(true);

        if (searchByName) {
          setSearchByName(false);
        }

        if (searchByDescription) {
          setSearchByDescription(false);
        }
      }
    }
  }, [initialQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({
      idOrQuery: query,
      filters: {
        hasTextTracks,
        hasDescription,
        searchByDescription,
        searchByName,
        searchByTags,
      },
    });
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Enter search term or tags (multiple tags should be comma separated) or Video ID"
        className="mr-2"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);

          if (e.target.value.length > 0 && e.target.value.includes(",")) {
            setSearchByTags(true);
            setSearchByName(false);
            setSearchByDescription(false);
          }

          if (e.target.value.length <= 0) {
            setSearchByTags(false);
            setSearchByName(true);
            setSearchByDescription(false);
          }
        }}
      />
      <div className="mb-3">
        <Form.Check
          inline
          type="switch"
          id="custom-switch"
          label="Search by title"
          checked={searchByName}
          onChange={(e) => {
            setSearchByName(e.target.checked);

            if (searchByTags && e.target.checked) {
              setSearchByTags(false);
            }
          }}
        />
        <Form.Check
          inline
          type="switch"
          id="custom-switch"
          label="Search by tag(s)"
          checked={searchByTags}
          onChange={(e) => {
            setSearchByTags(e.target.checked);

            if (searchByName && e.target.checked) {
              setSearchByName(false);
            }
            if (searchByDescription && e.target.checked) {
              setSearchByDescription(false);
            }
          }}
        />

        <Form.Check
          inline
          type="switch"
          id="custom-switch"
          label="Has description(s)"
          checked={hasDescription}
          onChange={(e) => {
            setHasDescription(e.target.checked);
            if (searchByDescription && !e.target.checked) {
              setSearchByDescription(false);
            }
          }}
        />
        <Form.Check
          inline
          type="switch"
          id="custom-switch"
          label="Search by description(s)"
          checked={searchByDescription}
          disabled={!hasDescription}
          onChange={(e) => {
            setSearchByDescription(e.target.checked);

            if (searchByTags && e.target.checked) {
              setSearchByTags(false);
            }
          }}
        />
        <Form.Check
          inline
          type="switch"
          id="custom-switch"
          label="Has text tracks"
          checked={hasTextTracks}
          onChange={(e) => setHasTextTracks(e.target.checked)}
        />
      </div>

      <Button type="submit">Search</Button>
    </Form>
  );
}

export default SearchBar;
