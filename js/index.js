

getLocation();
document.getElementById('temp').addEventListener("click",convertTemp);


function getLocation(){
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoSuccess, error);
}
  else
    {
      $("#notFound").html("<div>Please enter location! I'll try my best!</div><input type=text placeholder='Enter here' id='location'></input><button id='search'>Submit</button>");
            document.getElementById('search').addEventListener("click",function()   {getDataCity(document.getElementById('location').value);});
    }
  
};

function geoSuccess(position){ 
  var crd = position.coords;
  latVar = crd.latitude;
  lonVar = crd.longitude;
  getData();
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
       $("#notFound").html("<div>Please enter location! I'll try my best!</div><input type=text placeholder='Enter here' id='location'></input><button id='search'>Submit</button>");
            document.getElementById('search').addEventListener("click",function()   {getDataCity(document.getElementById('location').value);});
    
  
  
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
  console.log("getdataloc");
  console.log(urlBuilder);
  $.getJSON(urlBuilder,function(data){processData(data);});
}

function getJSON(urlBuilder){
   $.getJSON(urlBuilder,function(data){console.log(data);}, error);
  
}

function processData(data){
  tempC = data["main"]["temp"];
  tempCsym = '&#8451';
  tempF = (tempC * (9/5) + 32).toFixed(2);
  tempFsym = '&#8457';
  isMetric = true;

  
    document.getElementById("temp").innerHTML= tempC + ' ' + tempCsym ;  
    document.getElementById("city").innerHTML= data["name"];
    document.getElementById("coords").innerHTML = "[" + data["coord"]["lat"].toFixed(5) + "][" + data["coord"]["lon"].toFixed(5) + "]";
    document.getElementById("wind")
      .innerHTML= data["wind"]["speed"] + " mph"; 
 

}

function convertTemp(){
  var tempStr =  document.getElementById("temp").innerHTML.split(" ");

  if (isMetric == true){
    document.getElementById("temp").innerHTML = tempF + ' ' + tempFsym;
    isMetric = false;
  }
  else{
    document.getElementById(
      "temp").innerHTML = tempC + ' ' + tempCsym;
    isMetric = true;
  }
};