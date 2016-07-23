
$(".system").hide();
getLocation();
document.getElementById('metric').addEventListener("click",convert);
document.getElementById('imperial').addEventListener("click",convert);
document.getElementById('search').addEventListener("click",function(){
getDataCity(document.getElementById('location').value);
 });

function getLocation(){
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoSuccess, error);
} 
  else error();
};

function geoSuccess(position){ 
  var crd = position.coords;
  latVar = crd.latitude;
  lonVar = crd.longitude;
  getData();
}


function error(err) {
  document.getElementById("error").innerHTML = "Geolocation Failed. <br> Please input location in search box."
};

function getData(){
  urlBuilder = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?units=metric&" +  //address, crossorigin for https to http
   'lat=' + latVar +  // lat coordinates
    '&lon=' + lonVar + // lon coordinates 
    "&appid=0702c0948da3d42103f274acca388106";
  console.log("getdata");
$.getJSON(urlBuilder,function(data){processData(data);});
  
}

function getDataCity(location){
    urlBuilder = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?units=metric&q=" +  //address, crossorigin for https to http
   location +
    "&appid=0702c0948da3d42103f274acca388106";
  $.getJSON(urlBuilder,function(data){processData(data);});
}

function processData(data){
  tempC = data["main"]["temp"] + '&#8451';
  tempF = (data["main"]["temp"] * (9/5) + 32).toFixed(2) + '&#8457';
  coordinates = "[" + data["coord"]["lat"].toFixed(5) + "][" + data["coord"]["lon"].toFixed(5) + "]";
  cityName = data["name"];
  windMPH = data["wind"]["speed"] + ' mph';
  windKPH = (data["wind"]["speed"] * 1.60934).toFixed(2) + ' kph';
  img = data["weather"][0]["icon"];
  descr = capFirstLetter(data["weather"][0]["description"]);

  isMetric = true;
  $("#error").remove();
  $("#system").removeClass("invisible");

  document.getElementById("city").innerHTML   = cityName;
  document.getElementById("coords").innerHTML = coordinates; 
  document.getElementById("wind").innerHTML= windKPH;
  document.getElementById("temp").innerHTML= tempC;
  document.getElementById("descr").innerHTML = descr;
  document.getElementById("image").innerHTML = "<img src='http://openweathermap.org/img/w/" + img + ".png'></img>";

  $("#metric").addClass("selected");
}

 function capFirstLetter(descr){
  descr = descr.split(" ");
  for (var i=0; i < descr.length; i++){
    descr[i] = descr[i].split("");
    descr[i][0] = descr[i][0].toUpperCase();;
    descr[i] = descr[i].join("");
  }

return descr.join(" ");
}

function convert(){
  if (isMetric == true){
    document.getElementById("wind").innerHTML= windMPH;
    document.getElementById("temp").innerHTML= tempF;
      $("#metric").removeClass("selected");
      $("#imperial").addClass("selected");
    isMetric = false;
  }
  else{
    document.getElementById("wind").innerHTML= windKPH;
    document.getElementById("temp").innerHTML= tempC;
      $("#imperial").removeClass("selected");
      $("#metric").addClass("selected");
    isMetric = true;
  }

};
