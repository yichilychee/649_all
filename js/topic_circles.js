  //draw ten topic circles
  var Topic_frequency = [{"name":"love husband sex good years", "num":18663, "topic_num": 0},{name:"today didn told wanted made", "num":15115, "topic_num": 1},{name:"dh fucking fuck shit ass", "num":11457, "topic_num": 2},{name:"day time work home house", "num":18862, "topic_num": 3}, {name: "hate people friends family friend", "num": 21771, "topic_num": 4},{name: "eat fat food big dinner", "num": 26240, "topic_num": 5},{name: "kids mom kid im child", "num": 23141, "topic_num": 6},{name:"baby back year son school","num":23794, "topic_num": 7},{name: "dd ds night dh bed", "num":30837, "topic_num": 8},{name: "don feel bad make life", "num":31849, "topic_num": 9}];

  Topic_frequency.sort(function(a, b){ return (b.num - a.num); })


  var color = d3.scale.category10();
   var topicC = d3.select("#topics").append("svg")
      .attr("width", 1300)
      .attr("height", 200);

   var circles = topicC.selectAll("g")
      .data(Topic_frequency)
      .enter()
      .append("g")
      .append("circle")
      .attr("r", function(d,i){
          return (d.num/1000);
      })
      .attr("cx", function(d,i){ return (i*100+100);})
      .attr("cy", 50)
      .style("fill", function(d, i) { return color(i); })
      .on("click", function(d, i){
            //console.log(d.topic_num);
            drawKeywordFreq(d.topic_num);
            post_board(d.topic_num);
            moveRows(d.topic_num);
            scatterPlot(d.topic_num);
      })
      ;
      // .append("svg:title")
      // .text(function(d) { return "Topic Frequency: " + d.num; });


    //draw topic title under topic circles
    d3.selectAll("g")
      .data(Topic_frequency)
      .append("text")
      .each(function(d){
        var word = d.name.split(" ");
        for( var j=0; j<word.length; j++){
          d3.select(this).append("tspan")
          .text(function(d,i){
            // console.log(word[j]);
            return word[j];
            })
          .attr("dy", j ? "1.2em" : 0)
          .attr("x", 0)
          .attr("text-anchor", "middle");
        }
      })
      .attr("transform", function(d,i){return "translate(" +(i*100+100)+", 100)"})
      .style("fill", function(d, i) { return color(i); });


      //add frequence number to circles
      d3.selectAll("g")
      .data(Topic_frequency)
      .append("text")
      .text(function(d,i){return d.num;})
      .attr("text-anchor", "middle")
      .attr("transform", function(d,i){return "translate(" +(i*100+100)+", 55)"})
      .style("fill", "#0f0f0f");
