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
    data.poverty = +data.poverty;
    data.obesity = +data.obesity;
});
console.log(hdata)

// create scales & maxes
var xscale = d3.scaleLinear()
  .domain(d3.extent(hdata, d => d.poverty))
  .range([0, width]);

var yscale = d3.scaleLinear()
  .domain([0, d3.max(hdata, d => d.obesity)])
  .range([height, 0]);

var povertymax = d3.max(hdata, d => d.poverty);

var obesitymax = d3.max(hdata, d => d.obesity);

var ymax;
if (obesitymax > povertymax) {
  ymax = obesitymax;
} 
else {
  ymax = povertymax;
}

yscale.domain([0, ymax]);

// create the axes
var xaxis = d3.axisBottom(xscale).scale(xscale);
var yaxis = d3.axisLeft(yscale).scale(yscale);

// add axes to chart
chartgroup.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(xaxis);

// Add y-axis
chartgroup.append('g')
  .call(yaxis);

//  Create circles
var circlegroup = chartgroup.selectAll("circle").data(hdata).enter();

circlegroup
      .append("circle")
      .attr("cx", d => xscale(d.poverty))
      .attr("cy", d => yscale(d.obesity))
      .attr("r", "15")
      .attr("fill", "#89bdd3") 


circlegroup
      .append("text")
      .text(function(d) {
        return d.abbr;
      })
      .attr("dx", d => xscale(d.poverty))
      .attr("dy", d => yscale(d.obesity))
      .attr("font-family", "sans-serif")
      .attr("font-size", "15px")
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .style("display", "block")

    
// Create axis labels
chartgroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 10)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.style("text-anchor", "middle")
.text("Obesity (Percentage)");

chartgroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top - 35})`)
.attr("class", "axisText")
.style("text-anchor", "middle")
.text("Poverty (Percentage)");

});