
$(".system").hide();
getLocation();
document.getElementById('metric').addEventListener("click",convert);
document.getElementById('imperial').addEventListener("click",convert);
document.getElementById('temp').addEventListener("click",convert);
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
  document.getElementById("temp").innerHTML = "Geolocation Failed. <br> Please input location in search box."
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

  isMetric = true;

  $(".system").show();

  document.getElementById("city").innerHTML   = cityName;
  document.getElementById("coords").innerHTML = coordinates; 
  document.getElementById("wind").innerHTML= windKPH;
  document.getElementById("temp").innerHTML= tempC;

  $("#metric").addClass("selected");
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
