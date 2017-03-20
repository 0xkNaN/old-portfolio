/*
To get the Client-ID you have to register your application => https://blog.twitch.tv/client-id-required-for-kraken-api-calls-afbb8e95f843#.vvl4w4pzk
*/

var clientID = "icuz9urvvibtojwypwlhke6cp8uxtjy";
var channels = [
                "freecodecamp",
                "dreamhackcs",
                "riotgames",
                "esl_csgo",
                "Nightblue3",
                "summit1g",
                "LIRIK",
                "imaqtpie",
                "sodapoppin",
                "ESL_SC2",
                "syndicate",
                "PhantomL0rd",
                "captainsparklez",
                "tsm_bjergsen"
               ];
var base_url = "https://api.twitch.tv/kraken/";

// functions
function _construct(_logo,_name,_url,_info,_status,d_status){
  //console.log(data);
  $(".t-tv").append("<li data-status='"+d_status+"' data-search='"+_name+"' class='row'><img class='col-xs-2' src='"+_logo+"'><span class='col-xs-8'><a href='"+_url+"' target='_blank'>"+_name+"</a></span><span class='col-xs-1 status'>"+_status+"</span></li>");
}

function _error(_name){
  //console.log("error in "+channel);
    $(".t-tv").append("<li data-status='null' data-search='"+_name+"' class='row'><i class='col-xs-2 fa fa-question-circle-o' aria-hidden='true' style='font-size: 43px; width: 67px;'></i><span class='col-xs-8'><a>"+_name+"</a></span><span class='col-xs-1 status'><span class='fa fa-low-vision' aria-hidden='true'></span></span></li>");
}

// Get Data
function getData(channel, type){
  $.ajax({
    accept: "application/vnd.twitcht.v3+json",
    headers: {"client-ID" : clientID},
    url: base_url + type +"/"+ channel,
    type: "GET",
    dataType: "json",
    success: function(data){
      if(type === "streams"){
        if(data.stream === null){
          getData(channel, "channels")
        }
        else{
          var _logo = data.stream.channel.logo;
          var _name = data.stream.channel.name;
          var _url = data.stream.channel.url;
          var _info = data.stream.game;
          var _status = '<span class="fa fa-eye" aria-hidden="true"></span>';
          var d_status = "online";
          _construct(_logo,_name,_url,_info,_status,d_status);
          //console.log(data);
        }
      }
      else{
        var _logo = data.logo;
        var _name = data.name;
        var _url = data.url;
        var _status = '<span class="fa fa-eye-slash" aria-hidden="true"></span>';
        var d_status = "offline";
        _construct(_logo,_name,_url,_info,_status,d_status);
        //console.log(data);
      }
    },
    error: function(){
      //console.log("error in " + channel);
      _error(channel);
    }
  });
}

// get data loop
for(var channel in channels){
  //console.log(channels[channel]);
  getData(channels[channel], "streams");
}

// Menu feedback
$(".all").on("click", function(){
  $(".all > a").css("color","#6441a5");
  $(".online > a").css("color","white");
  $(".offline > a").css("color","white");
  $(".t-tv > li").show();
  $("input").val("");
});
$(".online").on("click", function(){
  $(".all > a").css("color","white");
  $(".online > a").css("color","#6441a5");
  $(".offline > a").css("color","white");
  $(".t-tv > li").show();
  $(".t-tv > li[data-status='null']").hide();
  $(".t-tv > li[data-status='offline']").hide();
  $("input").val("");
});
$(".offline").on("click", function(){
  $(".all > a").css("color","white");
  $(".online > a").css("color","white");
  $(".offline > a").css("color","#6441a5");
  $(".t-tv > li").show();
  $(".t-tv > li[data-status='null']").hide();
  $(".t-tv > li[data-status='online']").hide();
  $("input").val("");
});

// Search
$("input").on("change", function(){
  var q = $("input").val();
  if( q !== ""){
    //console.log("Input change");
    $(".all > a").css("color","#6441a5");
    $(".online > a").css("color","white");
    $(".offline > a").css("color","white");
    $(".t-tv > li").hide();
    $(".t-tv > li").each(function(){
      if($(this).attr('data-search').includes(q)){
        console.log($(this).attr('data-search'));
        $(this).show();
      }
    });
  }
  else{
    $(".all > a").css("color","#6441a5");
    $(".online > a").css("color","white");
    $(".offline > a").css("color","white");
    $(".t-tv > li").show();
  }
});

