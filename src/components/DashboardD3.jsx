import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

export const DashboardD3 = ({ channelData, channelVideos }) => {
  const refBar = useRef();

  useEffect(() => {
    dibujarGraficoBar();
  }, [channelVideos]);

  const dibujarGraficoBar = () => {
    d3.select(refBar.current).selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 70, left: 40 },
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(refBar.current)
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Filtrar los vídeos de los últimos 5 años
    const endYear = new Date().getFullYear();
    const startYear = endYear - 5;
    const videosLast5Years = channelVideos.filter((video) => {
      const videoYear = new Date(video.snippet.publishedAt).getFullYear();
      return videoYear >= startYear && videoYear <= endYear;
    });

    // Agrupar los vídeos por año
    let videosByYear = d3.rollups(
      videosLast5Years,
      (v) => v.length,
      (d) => new Date(d.snippet.publishedAt).getFullYear()
    );

    // Ordenar los datos por año
    videosByYear = videosByYear.sort((a, b) => d3.ascending(a[0], b[0]));

    const xScale = d3
      .scaleBand()
      .domain(videosByYear.map((d) => d[0]))
      .range([0, width])
      .padding(0.5);

    const maxVideos = d3.max(videosByYear, (d) => d[1]);
    console.log('maxVideos', maxVideos);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxVideos]) 
      .range([height, 0]);

    svg
      .selectAll("rect")
      .data(videosByYear)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => height - yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("fill", "steelblue");

    const xAxis = d3.axisBottom(xScale).tickFormat((d) => `${d}`);
    const yAxis = d3.axisLeft(yScale).ticks(10);


    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "axis-title")
      .attr("y", -10)
      .attr("x", width)
      .attr("text-anchor", "end")
      .attr("fill", "#5D6971")
      .text("Año");

    svg
      .append("g")
      .call(yAxis)
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .attr("fill", "#5D6971")
      .text("Vídeos subidos");
  };



  return (
    <div>
      <h1 className="h2">{channelData.snippet.title}</h1>
      <p>Visualizaciones totales: {channelData.statistics.viewCount}</p>
      <p>Videos subidos: {channelData.statistics.videoCount}</p>
      <div ref={refBar}></div>
    </div>
  );
};

DashboardD3.propTypes = {
  channelData: PropTypes.shape({
    snippet: PropTypes.object.isRequired,
    statistics: PropTypes.object.isRequired,
  }).isRequired,
  channelVideos: PropTypes.shape({
    snippet: PropTypes.object.isRequired,
    statistics: PropTypes.object.isRequired,
    filter: PropTypes.func.isRequired,
    }).isRequired,
};
