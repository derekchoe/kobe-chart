/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    6.5 - Event listeners and handlers in D3
 */
const kobeShot = () => {
    const height = 600
    const width = 995
    const g = d3
        .select('.chart__holder')
        .append('svg')
        .attr('viewBox', `0 0 ${height} ${width}`)
        .append('g');

    const filteredData = shotData.filter(datum => {
        if (datum.loc_y < 300) {
            return datum
        }
    });

    // First run of the visualization
    update(filteredData);

    $('.nav-select').on('change', function() {
        update(filteredData);
    });


    function update(data) {
        // Tooltip
        const tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .html(function(d) {
                let makeOrMiss = d.shot_made_flag === 1 ? 'Made' : 'Missed';
                let text = "<strong>Game Date</strong> <span style='color:gold'>" + d.game_date + '</span><br>';
                text += "<strong>Opponent</strong> <span style='color:gold'>" + d.opponent + '</span><br>';
                text += "<strong>Shot Range</strong> <span style='color:gold'>" + d.action_type + '</span><br>';
                text +=
                    "<strong>Shot Distance</strong> <span style='color:gold'>" +
                    d.shot_distance +
                    ' feet' +
                    '</span><br>';
                text += "<strong>Made or Missed</strong> <span style='color:gold'>" + makeOrMiss + '</span><br>';
                return text;
            });
        g.call(tip);

        //colors for circles
        const shotColor = d3
            .scaleOrdinal()
            .domain([1, 0])
            .range(['Purple', 'Gold']);

        const t = d3.transition().duration(100);

        //jquery selection for each datapoint
        const shot = $('.nav-select').val();

        //filtration of data based on game date
        const filteredData = data.filter(function(d) {
            if (shot === 'all') {
                return true;
            } else {
                return d.game_date === shot;
            }
        });

        // JOIN new data with old elements.
        const circles = g.selectAll('circle').data(filteredData, function(d) {
            return d;
        });

        // EXIT old elements not present in new data.
        circles
            .exit()
            .attr('class', 'exit')
            .remove();

        // ENTER new elements present in new data.
        circles
            .enter()
            .append('circle')
            .attr('class', 'enter')
            .attr('fill', (d) => shotColor(d.shot_made_flag))
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .merge(circles)
            .transition(t)
            .attr('cy', (d) => d.loc_y * 1.125 + 45)
            .attr('cx', (d) => d.loc_x * 1.08 + 305)
            .attr('opacity', '0.6')
            .attr('r', 2);
    }
};

// kobeShot();
