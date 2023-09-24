let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
const depthColors = ['#8f0', '#ee0', '#eb0', '#e80', '#b60', '#a00'];


function createMarkers(earthquakeData, myMap) {
    for (let i = 0; i < earthquakeData.features.length; i++){
        let feature = earthquakeData.features[i];
        let depth = feature.geometry.coordinates[2];
        let latLng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        let magnitude = feature.properties.mag;

        let fillColor1 = "";
        if (depth > 90){
            fillColor1 = depthColors[5];
        } else if (depth > 70){
            fillColor1 = depthColors[4];
        } else if (depth > 50){
            fillColor1 = depthColors[3];
        } else if (depth > 30){
            fillColor1 = depthColors[2];
        } else if (depth > 10){
            fillColor1 = depthColors[1];
        } else {
            fillColor1 = depthColors[0];
        }
        
        L.circle(latLng, {
            fillOpacity: 0.75,
            color: 'black',
            weight: .3,
            fillColor: fillColor1,
            radius: magnitude * 10000
        }).bindPopup(`<strong>Magnitude ${magnitude} -- ${feature.properties.place}</strong><br><hr>Latitude: ${latLng[0].toFixed(3)}, Longitude: ${latLng[1].toFixed(3)}<br>Time: ${new Date(feature.properties.time)}`).addTo(myMap);
    }
  
  }


  function createLegend(myMap){
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'legend');
        div.setAttribute('style', 'background-color: white; margin-left: 0px; padding: 0px 10px 0px 0px; border-radius: 5px;');
        let labels = [];

        let legendHTMLString = "<ul style=\"list-style-type: none; padding-left: 10px;\">";
        for (let i = 0; i < depthColors.length; i++){
            if (i == 0){
                legendHTMLString += `<li><span style=\"background-color: ${depthColors[i]};\">&emsp;</span> < 10</li>`;
            } else if (i == depthColors.length - 1){
                legendHTMLString += `<li><span style=\"background-color: ${depthColors[i]};\">&emsp;</span> > 90</li>`;
            } else {
                legendHTMLString += `<li><span style=\"background-color: ${depthColors[i]};\">&emsp;</span> ${i * 20 - 10}-${i * 20 + 10}</li>`;
            }
        }

        legendHTMLString += "</ul>";
        div.innerHTML = legendHTMLString;
        return div;
    }

    legend.addTo(myMap);
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

    createLegend(myMap);
  }

d3.json(url).then(createMap);
