
let div = document.querySelector('.container');

let map;
function initMap() {
  map = new google.maps.Map(div, {
    center: {lat: 34.0029, lng: -84.1446},
    zoom: 10
  });
  /*
  for (let i=0; i<=locations.length; i+=1) {
    let marker = new google.maps.Marker({
      position: locations[i],
      map: map
    });
  }
  */
  let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });
  let markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });
}

let locations = [
  {lat: 34.0754, lng: -84.2941},
  {lat: 33.7490, lng: -84.3880},
  {lat: 34.0029, lng: -84.1446},
  {lat: 32.8407, lng: -83.6324},
  {lat: 31.2074, lng: -83.2502},
  {lat: 32.7765, lng: -79.9311},
  {lat: 32.7767, lng: -96.7970}
];
