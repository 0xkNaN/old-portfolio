$(function() {
  var db, url = "http://codepen.io/hassenrmili/pen/kkPvvX.js";
  var guider = {};
  var size = 0;
  var db_process = false;
  // get data
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: function(data){
      var key = 0;
      var count = 0;
      for(key in data){
        if(data.hasOwnProperty(key)){
          //guider.
          var k = data[key];
          guider[count] = {};
          guider[count].name = k.name;
          guider[count].quotes = k.quotes.length;
          size++;
          count++;
        }
      }
      data.size = size;
      db = data;
      db_process = true;
      //ini
      randomize_data();
    }
  });
  
  // randomize data
  function randomize_data(){
    if(db_process){
      var character, quote;
      character = Math.floor(Math.random() * size);
      quote = Math.floor(Math.random() * guider[character].quotes);
    }
    //get the random quote.
    var random_character = db[character].name;
    var character_img_url = db[character].img.split("/");
	var character_img = "assets/images/" + character_img_url[character_img_url.length - 1];
	if (random_character == "Naruto Uzumaki") character_img = "assets/images/Naruto-1.jpg";
	if (random_character == "Sasuke Uchiha") character_img = "assets/images/sa.png";
	if (random_character == "Onoki") character_img = "assets/images/onoki.png";
	if (random_character == "Neji Hyuuga") character_img = "assets/images/Neji_Hyuga.png";
    var random_quote = db[character].quotes[quote];
    //...
    console.log(random_character);
    console.log(random_quote);
    console.log(character_img);
    // Rendering
    $(".title").html(random_character);
    $(".quote").html(random_quote);
    $(".char-img").attr("src", character_img);
  }
  
  $(".new-quote").on("click", function(){
    if(db_process){randomize_data();}
  });
});