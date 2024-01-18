import { useState } from "react";
import PropTypes from "prop-types";

export const ChannelGrid = ({ channelData, channelVideos }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 9;

  const sortedVideos = channelVideos.sort(
    (a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
  );
  const videosToShow = sortedVideos.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  return (
    <div className="container">
      {channelData && <h1 className="h2">{channelData.snippet.title}</h1>}
      <div className="row">
        {videosToShow.map((video) => (
          <div
            key={video.id.videoId}
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
          >
            <div className="card h-100">
              <img
                key={video.snippet.title}
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{video.snippet.title}</h5>
                <p className="card-text">
                  Fecha de subida:{" "}
                  {new Date(video.snippet.publishedAt).toLocaleDateString()}
                </p>
                <p className="card-text">
                  Visualizaciones: {video.statistics.viewCount}
                </p>
                <p className="card-text">Hash MD5: {video.md5Hash}</p>
              </div>
            </div>
          </div>
        ))}
        {channelVideos.length !== 0 && (
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Página anterior
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                (currentPage + 1) * videosPerPage >= channelVideos.length
              }
            >
              Página siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ChannelGrid.propTypes = {
  channelData: PropTypes.shape({
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    statistics: PropTypes.shape({
      viewCount: PropTypes.string.isRequired,
      videoCount: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  channelVideos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Aquí se cambia a string
      snippet: PropTypes.shape({
        title: PropTypes.string.isRequired,
        thumbnails: PropTypes.shape({
          medium: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
        publishedAt: PropTypes.string.isRequired,
      }).isRequired,
      statistics: PropTypes.shape({
        viewCount: PropTypes.string.isRequired,
      }).isRequired,
      md5Hash: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChannelGrid;
