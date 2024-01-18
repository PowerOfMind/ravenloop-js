import { useState } from "react";
import { ChannelGrid } from "./components/ChannelGrid";
import getYTChannel from "../src/helpers/getYTChannel";
import CryptoJS from "crypto-js";
import { DashboardD3 } from "./components/DashboardD3";
import LoginForm from "./components/LoginForm";
import { Constants } from './utils/Constants';

const App = () => {
  const [channelName, setChannelName] = useState("");
  const [channelData, setChannelData] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [currentComponent, setCurrentComponent] = useState("ChannelGrid");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  const searchChannel = async () => {
    const youTubeChannel = new getYTChannel(channelName,Constants.YOUTUBE_API_KEY );
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
    <div className="container">
      {isLoggedIn && (
        <>
          <header className="d-flex justify-content-center py-3">
            <h1 className="h2">Prueba técnica RavenLoop</h1>
          </header>

          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Nombre del canal"
            />
            <button className="btn btn-primary" onClick={searchChannel}>
              Buscar
            </button>
          </div>

          <nav className="nav nav-pills">
            <button
              className="nav-link"
              onClick={() => setCurrentComponent("ChannelGrid")}
            >
              Videos
            </button>
            <button
              className="nav-link"
              onClick={() => setCurrentComponent("Dashboard")}
            >
              Dashboard
            </button>
          </nav>

          {currentComponent === "ChannelGrid" && channelData && (
            <ChannelGrid
              channelData={channelData}
              channelVideos={channelVideos}
            />
          )}
          {currentComponent === "Dashboard" && channelData && (
            <DashboardD3
              channelData={channelData}
              channelVideos={channelVideos}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
