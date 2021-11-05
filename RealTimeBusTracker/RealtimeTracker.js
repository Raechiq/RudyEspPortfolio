mapboxgl.accessToken = 'pk.eyJ1IjoicmVzcGlub3phODYiLCJhIjoiY2t1eGJjcHFlNnIzeDJxcWp2d2IyOTJhdyJ9.t3sMmKHFkGwSFPOPw6piIw';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.091542, 42.358862],
  zoom: 12,
});

let mapMarkers = []

function createMapMarker(long,lat) {


  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';


let marker = new mapboxgl.Marker(el)
.setLngLat([long, lat])
.addTo(map);

mapMarkers.push(marker);
}


// Do not edit the code below
window.onload = () => {
  createMapMarker(-71.091542, 42.358862);
};

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { createMapMarker };
}



async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	mapMarkers.forEach((marker) => marker.remove())
	mapMarkers = []
	
	locations.forEach(element => {
	
	let long = element.attributes.longitude;
	let lat =element.attributes.latitude; 
	


	createMapMarker(long, lat)
	

	});

	// timer
	setTimeout(run, 5000);
}1

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();