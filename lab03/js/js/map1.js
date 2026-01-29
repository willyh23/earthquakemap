mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbHloMjMiLCJhIjoiY21obDBjN2ttMW1kdDJxcHI3a2s3YjR1dCJ9.1afNW3K_mxg4u55J1MPeaA';

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // Light style is better for Choropleth maps
    zoom: 3, // starting zoom
    minZoom: 3,
    center: [-98, 39], // Center of the US
    projection: { name: 'albers' } // REQUIRED for the lab
});

// Define color grades and matching colors for the Choropleth
const grades = [0, 10, 20, 50, 100];
const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#E31A1C'];

map.on('load', () => {
    map.addSource('covid-rates', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.json' // Make sure this matches your file name
    });

    map.addLayer({
        'id': 'covid-rates-layer',
        'type': 'fill', // For Choropleth, we use 'fill' instead of 'circle'
        'source': 'covid-rates',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'rates'], // CHANGE THIS to match the property name in your GeoJSON
                colors[0],
                grades[1], colors[1],
                grades[2], colors[2],
                grades[3], colors[3],
                grades[4], colors[4]
            ],
            'fill-outline-color': '#BBBBBB',
            'fill-opacity': 0.7
        }
    });

    // Popups on click
    map.on('click', 'covid-rates-layer', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.lngLat)
            .setHTML(`<strong>County:</strong> ${event.features[0].properties.county}<br>
                      <strong>Rate:</strong> ${event.features[0].properties.rates} per 1k`)
            .addTo(map);
    });
});

// Legend logic for Choropleth (Color Blocks)
const legend = document.getElementById('legend');
var labels = ['<strong>COVID-19 Rates</strong>'], vbreak;

for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    // We use 'legend-key' (colored squares) instead of 'dot' (circles)
    labels.push(
        '<p class="break"><i class="legend-key" style="background:' + colors[i] + ';"></i> ' +
        vbreak + (grades[i + 1] ? '&ndash;' + grades[i + 1] : '+') + '</p>'
    );
}

const source = '<p style="text-align: right; font-size:10pt">Source: <a href="https://nytimes.com/interactive/2021/us/covid-cases.html">NYT</a></p>';
legend.innerHTML = labels.join('') + source;