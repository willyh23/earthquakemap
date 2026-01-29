mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbHloMjMiLCJhIjoiY21obDBjN2ttMW1kdDJxcHI3a2s3YjR1dCJ9.1afNW3K_mxg4u55J1MPeaA';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', 
    zoom: 3.5,
    minZoom: 3,
    center: [-98, 39],
    projection: { name: 'albers' }
});


const grades = [1000, 5000, 10000],
      colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
      radii = [4, 10, 20];

map.on('load', () => {
    map.addSource('covid-counts', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.json'
    });

    map.addLayer({
        'id': 'covid-counts-point',
        'type': 'circle',
        'source': 'covid-counts',
        'paint': {
            
            'circle-radius': [
                'step',
                ['get', 'cases'], 
                radii[0],
                grades[1], radii[1],
                grades[2], radii[2]
            ],
            
            'circle-color': [
                'step',
                ['get', 'cases'], 
                colors[0],
                grades[1], colors[1],
                grades[2], colors[2]
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.6
        }
    });

   
    map.on('click', 'covid-counts-point', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML(`<strong>County:</strong> ${event.features[0].properties.county}<br>
                      <strong>Cases:</strong> ${event.features[0].properties.cases}`)
            .addTo(map);
    });
});


const legend = document.getElementById('legend');
var labels = ['<strong>Total Cases</strong>'], vbreak;

for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    dot_radii = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
        'px; height: ' + dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + 
        dot_radii / 2 + 'px;">' + vbreak + '</span></p>');
}

const source = '<p style="text-align: right; font-size:10pt">Source: <a href="https://nytimes.com/interactive/2021/us/covid-cases.html">NYT</a></p>';
legend.innerHTML = labels.join('') + source;