import "mapbox-gl";
//import MapboxLegendControl from "@watergis/mapbox-gl-legend";
import "@watergis/mapbox-gl-legend/css/styles.css";
//import { InspectControl } from "mapbox-gl-controls";
//import { TooltipControl } from "mapbox-gl-controls";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

var longitude = -122.21241175768318;
var latitude = 37.38372172238322;
var zoomLevel = 12;
var mapStyle = "mapbox://styles/david-j-cardinal/cknmb5pvd237s17s46pxdk2d9";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGF2aWQtai1jYXJkaW5hbCIsImEiOiJja25tYjFzZTgwOHFnMnVxemM0bHU2Z2EwIn0.TZ4pnGLEEf12QhkQuhsMbA";
var map = (window.map = new mapboxgl.Map({
  container: "map",
  zoom: zoomLevel,
  center: [longitude, latitude],
  style: mapStyle,
  antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
}));

var geoBlocks = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.17879, 37.386652]
      },
      properties: {
        title: "Closure",
        description: "Arastradero Road",
        mapID: "closeArastradero"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.193772, 37.405892]
      },
      properties: {
        title: "Closure",
        description: "Alpine Road",
        mapID: "closeAlpine"
      }
    }
  ]
};

var geoTCPs = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.192567, 37.400144]
      },
      properties: {
        title: "Traffic Control",
        description: "La Mesa, Ladera",
        mapID: "tcpLaMesa"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.192741, 37.403166]
      },
      properties: {
        title: "Traffic Control",
        description: "La Cuesta, Ladera",
        mapID: "tcpLaCuesta"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.194472, 37.410292]
      },
      properties: {
        title: "Traffic Control",
        description: "Alpine and 280",
        mapID: "tcpAlpine280"
      }
    }
  ]
};
const targets = {
  pipeline: "Pipeline",
  pipeline_annotation: "Pipeline Label",
  meter: "Water Meter",
  "flow meter": "Flow Meter",
  valve: "Valve",
  firehydrant: "Fire Hydrant",
  washout: "Washout",
  tank: "Tank",
  tank_annotation: "Tank Label",
  wtp: "WTP",
  wtp_annotation: "WTP Label",
  intake: "Intake",
  intake_annotation: "Intake Label",
  parcels: "Parcels",
  parcels_annotation: "Parcels Label",
  village: "Village",
  village_annotation: "Village Label",
  dma: "DMA",
  dma_annotation: "DMA Label"
};

var mitigationMarkers = [];
var mitigationMarker;

var complicationMarkers = [];
var complicationMarker;

map.on("load", function () {
  map.addControl(new mapboxgl.NavigationControl());

  var pMarker;

  // add markers to map
  geoTCPs.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement("div");
    el.className = "marker";

    // make a marker for each feature and add to the map

    pMarker = new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            "<h4>" +
              marker.properties.title +
              "</h4><p>" +
              marker.properties.description +
              "</p>"
          )
      )

      .addTo(map);
    pMarker.mapID = marker.properties.mapID;
    mitigationMarkers.push(pMarker);
  });

  var ourComplications = [];
  geoBlocks.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement("div");
    el.className = "closuremarker";

    // make a marker for each feature and add to the map

    pMarker = new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            "<h4>" +
              marker.properties.title +
              "</h4><p>" +
              marker.properties.description +
              "</p>"
          )
      )

      .addTo(map);
    pMarker.mapID = marker.properties.mapID;
    complicationMarkers.push(pMarker);
  });

  var mitigations = document.getElementById("list-mitigations");
  mitigations.addEventListener("change", function (e) {
    var handler = e.target.id;
    var useMarker = mitigationMarkers.find((el) => el.mapID === handler);
    if (e.target.checked === true) {
      useMarker._rotation = 0;
    } else {
      useMarker._rotation = 180;
    }
    useMarker._update();
  });

  var complications = document.getElementById("list-complications");
  complications.addEventListener("change", function (e) {
    var handler = e.target.id;
    var useMarker = complicationMarkers.find((el) => el.mapID === handler);
    if (e.target.checked === true) {
      useMarker._rotation = 0;
    } else {
      useMarker._rotation = 180;
    }
    useMarker._update();
  });
  // add legend control with checkbox, and it will be shown as default
  //map.addControl(
  //  new MapboxLegendControl(targets, { showDefault: true }),
  //  "bottom-right"
  //);

  //  map.addControl(new InspectControl(), "bottom-right");

  // add legend control with all layers, and it reverse layer order
  //  map.addControl(
  //    new MapboxLegendControl({}, { showDefault: true, reverseOrder: false }),
  //    "bottom-left"
  //  );
});
