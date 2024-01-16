import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ChannelGrid.css";

export const ChannelGrid = ({ channelData, channelVideos }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showHash, setShowHash] = useState(false);
  const videosPerPage = 10; // Cambia esto para ajustar cuántos videos se muestran por página

  const sortedVideos = channelVideos.sort(
    (a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
  );
  const videosToShow = sortedVideos.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );
  console.log("Videos to show", videosToShow);

  return (
    <div className="dashboard">
      {channelData && <h1>{channelData.snippet.title}</h1>}
      <div className="row">
        {videosToShow.map((video) => (
          <div
            key={video.id.videoId}
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
          >
            <div className="card">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h2 className="card-title">{video.snippet.title}</h2>
                <p className="card-text">
                  Fecha de subida:{" "}
                  {new Date(video.snippet.publishedAt).toLocaleDateString()}
                </p>
                <p className="card-text">
                  Visualizaciones: {video.statistics.viewCount}
                </p>
                <button onClick={() => setShowHash(!showHash)}>
                  {showHash ? "Ocultar" : "Mostrar"} Hash MD5
                </button>
                {showHash && (
                  <p className="card-text">Hash MD5: {video.md5Hash}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {channelVideos.length !== 0 && (
          <>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Página anterior
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                (currentPage + 1) * videosPerPage >= channelVideos.length
              }
            >
              Página siguiente
            </button>
          </>
        )}

        {/* Aquí iría el dashboard de estadísticas */}
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
      id: PropTypes.shape({
        videoId: PropTypes.string.isRequired,
      }).isRequired,
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
