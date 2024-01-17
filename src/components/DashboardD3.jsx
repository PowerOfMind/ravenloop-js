import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "bootstrap/dist/css/bootstrap.min.css";

export const DashboardD3 = ({ channelData, channelVideos }) => {
  const refBar = useRef();
  const refLine = useRef();

  useEffect(() => {
    dibujarGraficoBar();
    dibujarGraficoLinea();
  }, [channelVideos]);

  const dibujarGraficoBar = () => {
    d3.select(refBar.current).selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 70, left: 40 },
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(refBar.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
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

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(videosByYear, (d) => d[1])])
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
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d} vídeos`);

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
  const dibujarGraficoLinea = () => {
    d3.select(refLine.current).selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 70, left: 40 },
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(refLine.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const data = channelVideos.map((video) => ({
      date: new Date(video.snippet.publishedAt),
      views: Number(video.statistics.viewCount),
    }));

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.views)])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.views));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(d3.timeYear.every(1))
      .tickFormat(d3.timeFormat("%Y"));
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g").call(yAxis);
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
