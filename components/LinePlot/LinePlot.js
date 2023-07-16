import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SpiderGraph = ({ data, width, height }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) drawGraph();
  }, [data]);

  const drawGraph = () => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;
    const radius = Math.min(graphWidth, graphHeight) / 2;
    const centerX = graphWidth / 2 + margin.left;
    const centerY = graphHeight / 2 + margin.top;

    const svg = d3
      .select(graphRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${centerX},${centerY})`);

    const angleSlice = (2 * Math.PI) / data.length;

    // Scale for the radius
    const rScale = d3.scaleLinear().domain([0, 7]).range([0, radius]);

    // Draw the polygon
    const radarLine = d3
      .lineRadial()
      .curve(d3.curveLinearClosed)
      .radius((d) => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    const spider = g
      .selectAll(".spider")
      .data([data])
      .enter()
      .append("g")
      .attr("class", "spider");

    spider
      .append("path")
      .attr("class", "radar-chart")
      .attr("d", (d) => radarLine(d))
      .style("fill", "url(#gradient)")
      .style("stroke", "#D5A212")
      .style("stroke-width", "0px")
      .style("filter", "url(#glow)")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    // Draw the axis lines
    const axis = g
      .selectAll(".axis")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "axis");

    axis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(7) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(7) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("class", "axis-line")
      .style("stroke", "rgba(255, 255, 255, 0.3)")
      .style("stroke-width", "2px");

    // Draw the axis labels
    axis
      .append("text")
      .attr("class", "axis-label")
      .attr("x", (d, i) => rScale(7) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(7) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("dy", "0.4em")
      .attr("text-anchor", "middle")
      .text((d) => d.label);

    // Tooltip
    const tooltip = d3
      .select(graphRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .text("hello");

    function handleMouseOver(d, i) {
      const duration = 1000;

      d3.select(this)
        .transition()
        .duration(duration)
        .styleTween("fill", function () {
          return d3.interpolate("url(#gradient)", "url(#gradient2)");
        })
        .style("stroke-width", "10px")
        .style("stroke", "#FFFFFF");

      tooltip.transition().duration(duration).style("opacity", 1);
      tooltip.html(`<strong>${d.label}</strong><br/>Value: ${d.value}`);
    }

    function handleMouseOut(d, i) {
      d3.select(this)
        .transition()
        .duration(500)
        .style("fill", "url(#gradient)")
        .style("stroke-width", "0px");

      tooltip.transition().duration(200).style("opacity", 0);
    }

    // Create gradient for fill color animation
    const gradient = svg
      .append("defs")
      .append("radialGradient")
      .attr("id", "gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "70%")
      .attr("fx", "50%")
      .attr("fy", "50%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#D5A212");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#FF0000");

    const gradient2 = svg
      .append("defs")
      .append("radialGradient")
      .attr("id", "gradient2")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "70%")
      .attr("fx", "50%")
      .attr("fy", "50%");

    gradient2.append("stop").attr("offset", "0%").attr("stop-color", "#D5AA12");
    gradient2
      .append("stop")
      .attr("offset", "60%")
      .attr("stop-color", "#FF1200");

    gradient2
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#FF0000");
  };

  return <div className="graph-container" ref={graphRef}></div>;
};

export default SpiderGraph;
