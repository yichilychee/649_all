//draw post
post_board(10); 
function post_board(data_num){
    d3.selectAll(".item").remove();
    d3.csv("data/topic"+data_num+"popposts.csv")
    .row(function(d) { return {  text: d.Text, 
                                 Likes:+d.Likes,
                                 Hugs:+d.Hugs,
                                 MeToos:+d.Metoos,
                                 Overall:+d.Overall};
    })
    .get(function(error, rows) { 
      // console.log(rows); i<rows.length
      for(var i=0; i<30;i++){ //show 10 posts
              d3.select(".container")
                 .append("p")
                 .attr("class", "item")
                 .attr("transform", "translate(100,"+i*20+")")
                 .append("text")
                 .style("font-weight", "bold")
                 .style("text-anchor", "left")
                 .text(rows[i].text)
                 .append("p")
                 .text(" Likes: "+ rows[i].Likes +" Hugs: "+ rows[i].Hugs + " Me Toos: "+rows[i].MeToos)
                 .style("color", "#ffffff"); 
       }
    });
}   