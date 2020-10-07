// create the chart area
var svgwidth = 900;
var svgheight = 600;

var margin = {
    top: 75,
    right: 75,
    bottom: 75, 
    left: 75
  };

var width = svgwidth - margin.left - margin.right;
var height = svgheight - margin.top - margin.bottom;

var svg = d3.select("#scatter").append("svg")
  .attr("width", svgwidth)
  .attr("height", svgheight);

var chartgroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// load csv
d3.csv("/assets/data/data.csv").then(function(hdata) {
        hdata.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
    });
    console.log(hdata)
  });