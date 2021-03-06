
$(document).ready(function(){

  route1();

});

function route1(){

  var routesRequest = {
    travelMode: google.maps.TravelMode.WALKING
    , origin: "Rua Pará 293, Fortaleza"
    , destination: "Rua Pará 293, Fortaleza"
    , optimizeWaypoints: true
    , waypoints: [
      {
        location: "Av. José Bastos, Fortaleza"
      }
      , {
        location: "Av. Carneiro de Mendonça"
      }
    ]
  }

  loadRoute(routesRequest, {colorRoute: "#426d24"});
}

function route2(){

  var routesRequest = {
    travelMode: google.maps.TravelMode.WALKING
    , origin: "Rua Pará 293, Fortaleza"
    , destination: "Rua José Avelino, 480 - Praia de Iracema, Fortaleza - CE"
    , optimizeWaypoints: true
    , waypoints: [
      {
        location: "Av. Jovita Feitosa, Fortaleza"
        , stopover: false
      }
    ]
  }

  loadRoute(routesRequest, {colorRoute: "#dd2f00"});

}

function route3(){

  var routesRequest = {
    travelMode: google.maps.TravelMode.WALKING
    , origin: "Rua Pará 293, Fortaleza"
    , destination: "Rua José Avelino, 480 - Praia de Iracema, Fortaleza - CE"
    , optimizeWaypoints: true
    , waypoints: [
      {
        location: "Av. Imperador, Fortaleza"
        , stopover: false
      }
    ]
  }

  loadRoute(routesRequest, {colorRoute: "#333333"});

}

function loadRoute(routesRequestObject, options){

  var colorRoute = null;
  var strokeOpacity = 0.8;
  var strokeWeight = 7;

  if(options != undefined){
    var colorRoute = (options.colorRoute != undefined ? options.colorRoute : colorRoute);
    var strokeOpacity = (options.strokeOpacity != undefined ? options.strokeOpacity : strokeOpacity);
    var strokeWeight = (options.strokeWeight != undefined ? options.strokeWeight : strokeWeight);
  }

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true
    , polylineOptions: { 
      strokeColor: colorRoute
      , strokeOpacity: strokeOpacity
      , strokeWeight: strokeWeight 
    }
  });
  
  var map = getMap();

  directionsDisplay.setMap(map);

  directionsService.route(routesRequestObject, function(result, status){
    if(status === google.maps.DirectionsStatus.OK){
      directionsDisplay.setDirections(result);
    }
  });

}

function getMap(){

  var latLng = new google.maps.LatLng(-3.755419, -38.563412);

  var mapOptions = {
    center: latLng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: false,
    streetViewControl: false,
    panControl: false,
    mapTypeControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.DEFAULT
    }
  };

  var map = new google.maps.Map($("#map_canvas").get(0), mapOptions);

  var iconUrl = "img/pointer.png";

  var marker = new google.maps.Marker({
    icon: iconUrl
    , position: latLng
    , clickable: true
  });

  marker.info = new google.maps.InfoWindow({
    content: "<b style='color: black;'>Largada e Chegada</b>"
  });

  google.maps.event.addListener(marker, 'click', function() {
    marker.info.open(map, marker);
  });

  marker.setMap(map);

  return map;
}