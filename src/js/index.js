import '../styles/main.scss';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-markercluster/leaflet.markercluster';
import 'leaflet-markercluster/MarkerCluster.css';

import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  


(() => {

    window.addEventListener('load', (event) => {
        console.log('Firebrigade Map Prototype onload');
        var map = L.map('mapid');//.setView([ 47.40855755802086, 58.294749626263588], 1);
        //var url = 'https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg';
        var url = 'https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/{z}/{x}/{y}.jpeg';
        var tilelayer = new L.tileLayer(url);

        var drawnItems = L.featureGroup().addTo(map);
        

        map.addLayer(tilelayer);
        map.setView(L.latLng(47.40855755802086, 8.294749626263588), 15);

        // Default Leaflet controls
        // map.addControl(new L.Control.Draw({
        //     edit: {
        //         featureGroup: drawnItems,
        //         poly: {
        //             allowIntersection: false
        //         }
        //     },
        //     draw: {
        //         polygon: {
        //             allowIntersection: false,
        //             showArea: true
        //         }
        //     }
        // }));

        // Geoman Controls
        map.pm.addControls({  
            position: 'topleft',  
            drawCircle: true,
            drawControls: true,
            editControls: true,
            optionsControls: true,
            customControls: true,
            oneBlock: false,  
          });

        map.on(L.Draw.Event.CREATED, function (event) {
            var layer = event.layer;
            console.log('add layer', layer);
            drawnItems.addLayer(layer);
        });
    });

})();