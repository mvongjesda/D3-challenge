// Define SVG area dimensions
let svgWidth = 960;
let svgHeight = 500;

// Define the chart's margins as an object
let margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;
let chart = d3.select("#scatter").append("div").classed("chart", true);


let svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(censusData) {

  console.log(censusData);

// Parse healthcare and poverty data
  censusData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
  });


  let xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, data => data.healthcare)])
    .range([0, chartHeight]);

    let yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, data => data.poverty)])
    .range([chartHeight, 0]);


  let bottomAxis = d3.axisBottom(xLinearScale);
  let leftAxis = d3.axisLeft(yLinearScale);

  let drawLine = d3.line()
    .x(data => xLinearScale(data.healthcare))
    .y(data => yLinearScale(data.poverty));

  chartGroup.append("path")
    .attr("d", drawLine(censusData))
    .classed("dot", true);

  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
}).catch(function(error) {
  console.log(error);
});