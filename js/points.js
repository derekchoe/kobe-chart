const margin = { top: 50, right: 20, bottom: 100, left: 10};
const width = 1000 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#points")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)


const g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


d3.json("../data/points.json").then((data) => {
  data.forEach(d =>
    Number(d.points)
  );

  const x = d3.scaleBand()
    .domain(data.map(function(d){
      return d.season;
    }))
    .range([0, width])

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){return d.points;})])
    // .domain([0, 2832])
    .range([height, 0])

  const xAxis = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);

  const tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html(function(d) {
      let text = "<strong>Season</strong> <span style='color:gold'>" + d.season + "</span><br>";
      text += "<strong>Games Played</strong> <span style='color:gold'>" + d.games + "</span><br>";
      text += "<strong>Points</strong> <span style='color:gold'>" + d.points + "</span><br>";
      return text;
    });
  g.call(tip);

  const rects = g.selectAll("rect")
    .data(data)
    .enter()
      .append("rect")
        .attr("y", function(d){return y(d.points);})
        .attr("x", function(d){return x(d.season);})
        .attr("width", 25)
        .attr("height", function(d){return height-y(d.points)})
        .attr("fill", function(d){
          return "gold";
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
});
