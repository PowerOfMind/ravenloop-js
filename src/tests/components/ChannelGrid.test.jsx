import { render, fireEvent } from "@testing-library/react";
import ChannelGrid from "../../components/ChannelGrid";

describe("ChannelGrid", () => {
  const mockChannelData = {
    snippet: {
      title: "Test Title",
    },
    statistics: {
      viewCount: "1000",
      videoCount: "100",
    },
  };

  const mockChannelVideos = [
    {
      id: "1",
      snippet: {
        title: "Video Title",
        thumbnails: {
          medium: {
            url: "https://test.com",
          },
        },
        publishedAt: "2022-01-01T00:00:00Z",
      },
      statistics: {
        viewCount: "500",
      },
      md5Hash: "testhash",
    },
  ];

  it("renders without crashing", () => {
    render(
      <ChannelGrid
        channelData={mockChannelData}
        channelVideos={mockChannelVideos}
      />
    );
  });

  it("handles pagination", () => {
    const { getByText } = render(
      <ChannelGrid
        channelData={mockChannelData}
        channelVideos={mockChannelVideos}
      />
    );
    const nextPageButton = getByText("Página siguiente");
    fireEvent.click(nextPageButton);
  });
});
