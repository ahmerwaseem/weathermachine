
getLocation();
document.getElementById('metric').addEventListener("click",convertToMetric);
document.getElementById('imperial').addEventListener("click",convertToImperial);
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
  urlBuilder = "http://api.openweathermap.org/data/2.5/weather?units=metric&" +  //address, crossorigin for https to http
                'lat=' + latVar +  // lat coordinates
                '&lon=' + lonVar + // lon coordinates 
                "&appid=1efd58196142c6be9e2347a892affe5d";

$.getJSON(urlBuilder,function(data){processData(data);});
  
}



function getDataCity(location){
    urlBuilder = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" +  //address, crossorigin for https to http
                  location +
                  "&appid=1efd58196142c6be9e2347a892affe5d";

  $.getJSON(urlBuilder,function(data){processData(data);});
}



function processData(data){
  tempC = data["main"]["temp"] + '&#8451';
  tempF = (data["main"]["temp"] * (9/5) + 32).toFixed(2) + '&#8457';
  coordinates = "[" + data["coord"]["lat"].toFixed(5) + "][" + data["coord"]["lon"].toFixed(5) + "]";
  cityName = data["name"];
  windMPH = data["wind"]["speed"] + ' mph';
  windKPH = (data["wind"]["speed"] * 1.60934).toFixed(2) + ' kph';
  img = "<img src='http://openweathermap.org/img/w/" + data["weather"][0]["icon"] + ".png'></img>";
  descr = capFirstLetter(data["weather"][0]["description"]);
  $("#error").remove();
  $("#system").removeClass("invisible");

  document.getElementById("city").innerHTML   = cityName;
  document.getElementById("coords").innerHTML = coordinates; 
  document.getElementById("wind").innerHTML= windKPH;
  document.getElementById("temp").innerHTML= tempC;
  document.getElementById("descr").innerHTML = descr;
  document.getElementById("image").innerHTML = img;

  $("#metric").addClass("selected");
  $("#imperial").removeClass("selected");
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



function convertToImperial(){
    document.getElementById("wind").innerHTML= windMPH;
    document.getElementById("temp").innerHTML= tempF;
      $("#metric").removeClass("selected");
      $("#imperial").addClass("selected");
}
function convertToMetric(){
    document.getElementById("wind").innerHTML= windKPH;
    document.getElementById("temp").innerHTML= tempC;
      $("#imperial").removeClass("selected");
      $("#metric").addClass("selected");
}
