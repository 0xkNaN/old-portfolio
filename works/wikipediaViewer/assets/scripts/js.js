$(function(){  
  $("#search-query").on("change", function(){
    var q = $("#search-query").val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+q+"&format=json&callback=?";
    //$("#search-result").html(url+"<br>");
    if(q !== ""){  
      $.ajax({
        url: url,
        type: 'GET',
        dataType:'json',
        success: function(data){
          //...
          $("img").css("display", "none");
          $("ul").empty();
          if(data[1].length == 0){
            console.log("there is no return!");
            $("#search-result").append("<li><h4>'"+q+"' does not exist</h4><span>There were no results matching the query.You can <a href='https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation' target='_blank'>ask for it to be created</a>.</span></li>");
          }
          for(var i =0; i < data[1].length; i++){
            $("#search-result").append("<li><h4>"+data[1][i]+ "</h4><span>"+data[2][i]+"</span>..<a href='"+data[3][i]+"' target='_blank'> Continue reading</a></li>");
          }
      }});
    }
  });
});