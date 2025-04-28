import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

function VideoCard({ video }) {
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState("");

  const playerUrl = `https://players.brightcove.net/${video.account_id}/obdhcLv77W_default/index.html?videoId=${video.id}`;

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(playerUrl);
      setCopySuccess("Video URL copied to clipboard!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    } catch (err) {
      console.error("Failed to copy video URL: ", err);
      setCopySuccess("Failed to copy video URL.");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{video.name}</Card.Title>
        <div className="embed-responsive embed-responsive-16by9">
          {loading && (
            <div
              className="embed-responsive-item d-flex justify-content-center align-items-center"
              style={{ height: "100%" }}
            >
              <Spinner animation="border" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <iframe
            className="embed-responsive-item"
            src={playerUrl}
            allowFullScreen
            title={`Brightcove Player for ${video.name}`}
            onLoad={handleIframeLoad}
            style={{ opacity: loading ? 0 : 1 }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <Card.Subtitle className="mt-2">ID: {video.id}</Card.Subtitle>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              zIndex: 2,
            }}
          >
            <Button
              variant={copySuccess.length > 0 ? "success" : "outline-warning"}
              size="sm"
              text="Copy video URL"
              onClick={handleCopyToClipboard}
            >
              {copySuccess.length > 0 ? (
                <FaClipboardCheck className="me-1" />
              ) : (
                <FaClipboard className="me-1" />
              )}
            </Button>
          </div>
        </div>

        {video.description && (
          <Card.Text className="mt-2">
            <strong>Description:</strong> {video.description}
          </Card.Text>
        )}
        {video.long_description && (
          <Card.Text className="mt-2">
            <strong>Long Description:</strong> {video.long_description}
          </Card.Text>
        )}
        {video.text_tracks && video.text_tracks.length > 0 && (
          <ListGroup className="mt-2">
            <ListGroup.Item>
              <strong>Text Tracks:</strong>
            </ListGroup.Item>
            {video.text_tracks.map((track) =>
              track.sources.map((trackSource, index) => (
                <ListGroup.Item key={index}>
                  <Button variant="outline-info">
                    <a
                      href={trackSource.src}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {track.mime_type} ({track.srclang})
                    </a>
                  </Button>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default VideoCard;
