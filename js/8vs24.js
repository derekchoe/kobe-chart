const pieChart = () => {
  const width = 500;
  const height = 500;
  const radius = 250;
  const color = d3
    .scaleOrdinal()
    .domain([8, 24])
    .range(["gold","purple"]);

  let chart = d3
    .select("#oldVsYoung")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //add tooltip
  let tooltip = d3.select("#oldVsYoung")
    .append("div")
      .classed("tooltip", true);
    tooltip.append("div")
      .classed("seasons", true);
    tooltip.append("div")
      .classed("points", true);
    tooltip.append("div")
      .classed("games", true);
  

  const pie = d3.pie()
    .sort(null)
    .value(function (d) { return d.points; })

  //creating donut pie chart 
  const arcs = d3.arc()
    .outerRadius(50)
    .innerRadius(150)
    .padAngle(0.5)
    .padRadius(20)
    .cornerRadius(15);

  const arcHover = d3.arc()
    .outerRadius(75)
    .innerRadius(180)
    .padAngle(0.05)
    .cornerRadius(40);
  
  

  // const svg = d3
  //   .select("oldVsYoung")
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .append("g")
  //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
    
  d3.json("../data/8vs24.json").then(data => {
    let sections = chart
      .append("g")
      .attr("transform", "translate(400, 400)")
      .selectAll("path")
      .data(pie);

    chart.selectAll("path").remove();

    let section = sections.enter().append("path")
      .attr("d", (d) => arcs(d))
      .attr("fill", (d) => color(d.data.number))
      .on("mouseover", mouseOver)
      .on("mouseleave", mouseLeave);

    function mouseOver(d) {
      d3.select(this)
        .transition()
        .duration(300)
        .attr("d", d2 => arcHover(d2));
      tooltip.attr("hidden", null);
      tooltip.select('.seasons')
        .html(d.data.seasons);
      tooltip.select('.games')
        .html(d.data.games);
      tooltip.select('.points')
        .html(d.data.points);
      // let percentage = Math.round(1000 * d.data.points / 33643) / 10;
      // tooltip.select('.percentage')
      //   .html(String(percentage) + " %");
    }

    function mouseLeave() {
      d3.select(this)
        .transition()
        .duration(300)
        .attr("d", (d2) => arcs(d2));
      tooltip.attr("hidden", true);
    }

    // const g = chart.selectAll(".arc")
    //   .data(pie(data))
    //   .enter().append("g")
    //   .attr("class", "arc");

    // g.append("path")
    //   .attr("d", arcs)
    //   .style("fill", function(d) {return color(d.data.number);})
    //   .on("mouseover", mouseOver)
    //   .on("mouseleave", mouseLeave);




 



  });

  // function type(d){
  //   return Number(d.points)
  // }

};

pieChart();