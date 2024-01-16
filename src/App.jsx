import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChannelGrid, Dashboard } from "./components";
import getYTChannel from "../src/helpers/getYTChannel";
import CryptoJS from "crypto-js";
const YOUTUBE_API_KEY = "AIzaSyBcmm3mbU3SODgXeSIMKYv6zb_mIcabJsA";

const App = () => {
  const [channelName, setChannelName] = useState("");
  const [channelData, setChannelData] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);

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
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/channel-grid">Channel Grid</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button onClick={searchChannel}>Buscar</button>

        <Routes>
          <Route
            path="/channel-grid"
            element={
              <ChannelGrid
                channelData={channelData}
                channelVideos={channelVideos}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard channelData={channelData} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
