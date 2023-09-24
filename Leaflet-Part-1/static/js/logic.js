let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';


function createMarkers(earthquakeData, myMap) {
    for (let i = 0; i < earthquakeData.features.length; i++){
        let feature = earthquakeData.features[i];
        let depth = feature.geometry.coordinates[2];
        let latLng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        let magnitude = feature.properties.mag;

        let fillColor1 = "";
        if (depth > 15){
            fillColor1 = 'yellow';
        } else {
            fillColor1 = 'blue';
        }
        
        L.circle(latLng, {
            fillOpacity: 0.75,
            color: 'white',
            fillColor: fillColor1,
            radius: magnitude * 10000
        }).addTo(myMap);
    }
  
  }
  
  
  function createMap(earthquakeData) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street]
    });

    createMarkers(earthquakeData, myMap);
  }

d3.json(url).then(createMap);
