import React from "react";
import VideoCard from "./VideoCard";
import { Container, Row, Col } from "react-bootstrap";

function VideoList({ videos }) {
  return (
    <Container>
      <Row className="d-flex flex-wrap">
        {videos.map((video) => (
          <Col key={video.id} md={4} lg={3} className="mb-4">
            <VideoCard video={video} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default VideoList;
