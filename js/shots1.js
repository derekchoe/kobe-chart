/*
*    main.js
*    Mastering Data Visualization with D3.js
*    6.5 - Event listeners and handlers in D3
*/

var margin = { left: 80, right: 20, top: 50, bottom: 100 };
var height = 500 - margin.top - margin.bottom,
  width = 1500 - margin.left - margin.right;

var g = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left +
    ", " + margin.top + ")");

var formattedData;




d3.json("../data/shot_data1.json").then(function (data) {
  console.log(data);

  // Clean data
  formattedData = data.filter(function (shot) {
    return shot;
  });

  // Scales
  const x = d3.scaleLog()
    .domain([0, d3.max(data, function (d) { return d.loc_x; })])
    .range([0, width])
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return d.loc_y; })])
    .range([height, 0])
  const color = d3.scaleOrdinal()
    .domain(['Make', "Miss"])
    .range(['Purple', 'Gold']);

  // Legend
  const makesOrMisses = ["Make", "Miss"];
  const legend = g.append("g")
    .attr("transform", "translate(" + (250) +
      "," + (100) + ")");

  makesOrMisses.forEach(function (makeOrMiss, i) {
    const legendRow = legend.append("g")
      .attr("transform", "translate(0, " + (i * 20) + ")");

    legendRow
      .append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", color(makeOrMiss))

    legendRow
      .append("text")
      .attr("x", -10)
      .attr("y", 10)
      .attr("text-anchor", "end")
      .style("text-transform", "capitalize")
      .text(makeOrMiss)
      .attr("color", "#fff");
  });

  // First run of the visualization
  update(formattedData);

})


$("#year-select").on("change", function() {
  update(formattedData);
});

function update(data) {
  
  // Tooltip
  var tip = d3.tip().attr('class', 'd3-tip')
    .html(function (d) {
      let text = "<strong>Game Date</strong> <span style='color:gold'>" + d.game_date + "</span><br>";
      text += "<strong>Shot Distance</strong> <span style='color:gold'>" + d.shot_distance + "</span><br>";
      text += "<strong>Shot Range</strong> <span style='color:gold'>" + d.shot_zone_range + "</span><br>";
      text += "<strong>Opponent</strong> <span style='color:gold'>" + d.opponent + "</span><br>";
      return text;
    });
  g.call(tip);
  
  //colors for circles
  const shotColor = d3.scaleOrdinal()
    .domain([1, 0])
    .range(['Purple', 'Gold']);
    
  var t = d3.transition()
    .duration(100);

  //jquery selection for each datapoint
  var shot = $("#year-select").val();
  
  //filtration of data based on game date
  var data = data.filter(function (d) {
    if (shot == "all") { return true; }
    else {
      return d.game_date == shot;
    }
  })

  // JOIN new data with old elements.
  var circles = g.selectAll("circle").data(data, function (d) {
    return d;
  });

  // EXIT old elements not present in new data.
  circles.exit()
    .attr("class", "exit")
    .remove();

  // ENTER new elements present in new data.
  circles.enter()
    .append("circle")
    .attr("class", "enter")
    .attr("fill", function (d) { return shotColor(d.shot_made_flag); })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
    .merge(circles)
    .transition(t)
    .attr("cy", function (d) { return (d.loc_y*1.3); })
    .attr("cx", function (d) { return (d.loc_x*1.5) + 700 })
    .attr("opacity", "0.6")
    .attr("r", 2)
}