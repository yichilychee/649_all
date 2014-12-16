//draw overall keyword frequency
drawKeywordFreq(10);
function drawKeywordFreq(data_num){
  d3.select(".barchart").remove();
  var margin = {top: 10, right: 50, bottom: 70, left: 55},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // var formatPercent = d3.format(".0%");

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var tip = d3.tip()
    // .data("data/topic"+data_num+"_keywordfrequency.csv")
    // .data("data/topic0_keywordfrequency.csv")
    .attr('class', 'd3-tip')
    .offset([-10, -7])
    .html(function(d) {
      if(data_num != 10){
        return "<strong>Overall frequency:</strong> <span style='color:red'>" + d.Frequency_all + "</span>" + "<br/>" + "<strong>Topic frequency:</strong> <span style='color:red'>" + d.Frequency_topic + "</span>";
      }
      else{
        return "<strong>Overall frequency:</strong> <span style='color:red'>" + d.Frequency_all + "</span>";
      }
    })

var svg = d3.select("#keywords").append("svg")
    .attr("class", "barchart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svg.call(tip);

d3.csv("data/topic" + data_num + "_keywordfrequency.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.Keyword; }));
  y.domain([0, d3.max(data, function(d) { return d.Frequency_all; })]);

  // x.domain(d3.extent(data, function(d) { return d.polarity; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function(d) {
          return "rotate(-40)" 
          });

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg.selectAll(".barA")
      .data(data)
      .enter().append("rect")
      .attr("class", "barA")
      .attr("x", function(d) { return x(d.Keyword); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Frequency_all); })
      .attr("height", function(d) { return height - y(d.Frequency_all); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);


  if(data_num != 10){
    svg.selectAll(".barT")
        .data(data)
        // .append("g")
        .enter().append("rect")
        .attr("class", "barT")
        .attr("x", function(d) { return x(d.Keyword); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.Frequency_topic); })
        .attr("height", function(d) { return height - y(d.Frequency_topic); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
  }

});

  function type(d){
    d.Frequency_all = +d.Frequency_all;
    return d;
  }
}