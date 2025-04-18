import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function VideoCard({ video }) {
  const playerUrl = `https://players.brightcove.net/${video.account_id}/obdhcLv77W_default/index.html?videoId=${video.id}`;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{video.name}</Card.Title>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={playerUrl}
            allowFullScreen
            title={`Brightcove Player for ${video.name}`}
          />
        </div>
        <Card.Subtitle className="mt-2">ID: {video.id}</Card.Subtitle>
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
      </Card.Body>
    </Card>
  );
}

export default VideoCard;
