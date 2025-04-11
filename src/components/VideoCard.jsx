import React from "react";
import { Card } from "react-bootstrap";

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
        <Card.Text className="mt-2">ID: {video.id}</Card.Text>
        {/* You can add more video details here */}
      </Card.Body>
    </Card>
  );
}

export default VideoCard;
