// import * as d3 from "d3";

/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

// USE 
// d3.json("data/data.json").then(function(data{
// }))


// const width = 960 - margins.left - margins.right;
// const height = 500 - margins.top - margins.bottom;



// const legend = g.append("g")
//   .attr("transform", "translate(" + (w))


//pulling data from shot_data
d3.json("../data/shot_data1.json").then((data) => {
  data.filter(d=>
    d
  );
  
  //margins
  const margin = { top: 20, right: 10, bottom: 20, left: 10 };
  const svg = d3.select("#chart-area").append("svg")
    .attr("width", 1500)
    .attr("height", 800)
    .attr("background-image", "url('court.png')")

  const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  

  //color scheme (ordinal scale)
    const color = d3.scaleOrdinal()
      .domain(['Make', "Miss"])
      .range(['Purple', 'Gold']);
    
  //creating legend
  const makesOrMisses = ["Make", "Miss"];
  const legend = g.append("g")
    .attr("transform", "translate(" + (250) +
      "," + (100) + ")");


  makesOrMisses.forEach(function (makeOrMiss, i) {
    const legendRow = legend.append("g")
      .attr("transform", "translate(0, " + (i * 20) + ")");

    legendRow.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", color(makeOrMiss))

    legendRow.append("text")
      .attr("x", -10)
      .attr("y", 10)
      .attr("text-anchor", "end")
      .style("text-transform", "capitalize")
      .text(makeOrMiss)
  });

  //Tool Tips
  const tip = d3.tip().attr('class', 'd3-tip')
    .html(function(d){
      let text = "<strong>Game Date</strong> <span style='color:gold'>" + d.game_date + "</span><br>";
      text += "<strong>Shot Distance</strong> <span style='color:gold'>" + d.shot_distance + "</span><br>";
      text += "<strong>Shot Range</strong> <span style='color:gold'>" + d.shot_zone_range + "</span><br>";
      text += "<strong>Opponent</strong> <span style='color:gold'>" + d.opponent + "</span><br>";
      return text;
    });
  g.call(tip);
  
  // plotting all the makes in purple
  let makes = g.selectAll("circle")
    .data(data.filter(d=>d.shot_made_flag===1));
  

  //plotting all the misses in gold
  let misses = g.selectAll("circle")
    .data(data.filter(d => d.shot_made_flag === 0));

  misses
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      // return d.loc_x;
      return d.loc_x * 2 + 800;
    })
    .attr("cy", function(d) {
      // return d.loc_y;
      return d.loc_y * 2 + 100;
    })
    .attr("r", 3)
    .attr("fill", "gold")
    .attr("opacity", 0.7)
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  makes.enter()
    .append("circle")
      .attr("cx", function(d){
        // return (d.loc_x);
        return (d.loc_x)*2 + 800;
      })
    .attr("cy", function (d) {
      // return d.loc_y;
      return (d.loc_y)*2 + 100;
    })
    .attr("r", 3)
    .attr("fill", "Indigo")
    .attr("opacity", 0.7)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

}).catch(function(error){
  console.log(error)
})