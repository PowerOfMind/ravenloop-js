import { useState} from "react";
import getYTChannel from '../helpers/getYTChannel';
import CryptoJS from "crypto-js";
const YOUTUBE_API_KEY = "AIzaSyBcmm3mbU3SODgXeSIMKYv6zb_mIcabJsA"; // Asegúrate de importar la clase YouTubeChannel

export const Dashboard = () => {
  const [channelName, setChannelName] = useState("");
  const [channelData, setChannelData] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 10; // Cambia esto para ajustar cuántos videos se muestran por página

  

  const searchChannel = async () => {
    const youTubeChannel = new getYTChannel(channelName, YOUTUBE_API_KEY);
    const data = await youTubeChannel.getAllData();
    setChannelData(data.channelData);
    setChannelVideos(
      data.channelVideos.map((video) => ({
        ...video,
        md5Hash: CryptoJS.MD5(video.snippet.title).toString(),
      }))
    );
    setCurrentPage(0);
  };
  
  const sortedVideos = channelVideos.sort(
    (a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
  );
  const videosToShow = sortedVideos.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );
  console.log("Videos to show", videosToShow);
  

  return (
    <div>
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={searchChannel}>Buscar</button>
      {channelData && <h1>{channelData.snippet.title}</h1>}
      <ul>
        {videosToShow.map((video) => (
          <li key={video.id.videoId}>
            <img src={video.snippet.thumbnails.medium.url} />
            <h2>{video.snippet.title}</h2>
            <p>
              Fecha de subida:{" "}
              {new Date(video.snippet.publishedAt).toLocaleDateString()}
            </p>
            {/* <p>Visitas: {video.statistics.viewCount}</p> */}
            <p>Hash MD5: {video.md5Hash}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Página anterior
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={(currentPage + 1) * videosPerPage >= channelVideos.length}
      >
        Página siguiente
      </button>
      {/* Aquí iría el dashboard de estadísticas */}
    </div>
  );
};

export default Dashboard;

