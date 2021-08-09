import '../styles/main.scss';
import 'leaflet/dist/leaflet.css';
import 'leaflet';



import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-markercluster/leaflet.markercluster';
import 'leaflet-markercluster/MarkerCluster.css';


import 'leaflet-styleeditor';

import { TextControl, SVGTextBoxEditableMixin} from 'leaflet-text-editable';
L.Editable.include(SVGTextBoxEditableMixin);
import 'leaflet-styleeditor/src/css/Leaflet.StyleEditor.css';

import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  


(() => {

    window.addEventListener('load', (event) => {
        console.log('Firebrigade Map Prototype onload');
        var map = L.map('mapid', {
            editable: true
        });//.setView([ 47.40855755802086, 58.294749626263588], 1);
        //var url = 'https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg';
        var url = 'https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/{z}/{x}/{y}.jpeg';
        var tilelayer = new L.tileLayer(url);

        var drawnItems = L.featureGroup().addTo(map);
        

        map.addLayer(tilelayer);
        map.setView(L.latLng(47.40855755802086, 8.294749626263588), 15);
        //map.setView([52.5069,13.4298], 15);
        //Default Leaflet controls
        map.addControl(new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                poly: {
                    allowIntersection: false
                }
            },
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: true
                }
            }
        }));

        const styleEditor = new L.Control.StyleEditor({
            position: 'topleft',
            openOnLeafletEditable: false,
            useGrouping: false, // otherwise a change style applies to all
        });
        map.addControl(styleEditor);
        

        const textControl = new TextControl();
        map.addControl(textControl);

        const clickHandler = function(e) {
            console.log("click feature")
            
            const current = styleEditor.options.util.getCurrentElement();
            if (current && current.editor) {
                current.editor.disable();
            }
            
            this.enableEdit();
            
            styleEditor.initChangeStyle({'target': this});
            styleEditor.options.util.setCurrentElement(this);
            
            L.DomEvent.stopPropagation(e)
        }
        
        map.on('editable:drawing:start', e => {
            const current = styleEditor.options.util.getCurrentElement();
            if (current && current.editor) {
                current.editor.disable();
            }
            styleEditor.hideEditor();
        });

        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
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

        // Style editor
        //map.addControl(L.control.styleEditor())
        //console.log('')

        map.on(L.Draw.Event.CREATED, function (event) {
            var layer = event.layer;
            console.log('add layer', layer);
            drawnItems.addLayer(layer);
        });

        // L.easyButton( '<span class="star">&starf;</span>', function(){
        //     alert('you just clicked the html entity \&starf;');
        // }).addTo(map);

        //L.Control.textinput().addTo(map);

        // const label = 'Headline'
        // const text = '12:00 | Alexanderplatz\n„Alle gegen Alle“'
        // const bounds = L.latLngBounds([52.50998775888057,13.444347381591799],[52.50611297738362,13.427524566650392]);
        // svgLabelledTextBox(bounds, label, text).addTo(map)
    });

})();