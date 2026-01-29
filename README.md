# US COVID-19 Interactive Maps (2020)

## Project Introduction
This repository contains two interactive thematic maps visualizing COVID-19 data across United States counties in 2020. 
- **Map 1** is a Choropleth map showing case rates per 1,000 residents.
- **Map 2** is a Proportional Symbol map showing total case counts.

## Live Links
* [Map 1: COVID-19 Rates](https://willyh23.github.io/earthquakemap/lab03/map1.html)
* [Map 2: COVID-19 Counts](https://willyh23.github.io/earthquakemap/lab03/map2.html)

## Screenshots
### Map 1: Rates
![Map 1 Screenshot](img/case_rates.png)

### Map 2: Counts
![Map 2 Screenshot](img/case_counts.png)

## Primary Functions
* **Dynamic Legend Generation:** The legends for both maps are built dynamically using JavaScript loops that iterate through the data classification "grades" and "colors."
* **Interactive Popups:** Custom Mapbox popups are triggered on `click` events to display specific county names and statistical values.
* **Custom Albers Projection:** A key feature not covered in standard tutorials is the implementation of the **Albers USA projection** directly within the Mapbox GL JS map object using `projection: { name: 'albers' }`. This ensures a non-distorted, geographically accurate representation of the US.

## Libraries in Use
* **Mapbox GL JS:** High-performance map rendering.
* **Google Fonts:** Specifically the 'Open Sans' family for typography.
* **Mapshaper:** Used to simplify GeoJSON geometry to improve web performance.

## Data Sources
* **COVID-19 Data:** Sourced from the New York Times
* **Base Map Layers:** Provided by Mapbox (Light and Dark styles)
* **GeoJSON Assets:** Compiled from US Census Bureau data

## Credits and Acknowledgments
* Developed by **Willy Hung** for GEOG 458
* Base logic for the Proportional Symbol map was adapted from the Japan Earthquake tutorial provided by the course