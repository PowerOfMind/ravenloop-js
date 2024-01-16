import { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from "prop-types";

const DashBoard = ({ channelData }) => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Visitas', 'Vídeos subidos'],
    datasets: [
      {
        label: 'Estadísticas del canal',
        data: [channelData.statistics.viewCount, channelData.statistics.videoCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      chartInstance.destroy();
    }
  }, [channelData]);

  return <Bar ref={chartRef} data={data} options={options} />;
};

DashBoard.propTypes = {
  /* channelData: PropTypes.shape({
    statistics: PropTypes.shape({
      viewCount: PropTypes.string.isRequired,
      videoCount: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired, */
};

export default DashBoard;
