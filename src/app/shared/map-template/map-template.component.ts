import {Component, Input, OnInit} from '@angular/core';
import 'leaflet';
import {MapObject} from '../services/map-services/map-object';
declare var L;
@Component({
  selector: 'app-map-template',
  templateUrl: './map-template.component.html',
  styleUrls: ['./map-template.component.css']
})
export class MapTemplateComponent implements OnInit {
  @Input() mapObject: MapObject;
  map: any;
  legend: any;

  constructor() {
  }

  ngOnInit() {
    if (this.mapObject) {
      setTimeout(() => {
        this.map ? this.map.remove() : null;
        this.legend = this.mapObject.legendInterface;
        this.map = L.map(this.mapObject.id, this.mapObject);
        this.mapObject.layers[1] ? this.map.fitBounds(this.mapObject.layers[1].getBounds()) : null;
        L.control.scale({position: 'bottomleft', metric: true, updateWhenIdle: true}).addTo(this.map);
      }, 20);

    }

  }

  /**
   * Update map Zoom Level
   * */
  zoomIn(zoomType) {
    zoomType === 'in' ? this.map.zoomIn() :
      zoomType === 'out' ? this.map.zoomOut() :
        this.map.setZoom(this.mapObject.zoom);
  }

  recenterMap() {

    this.mapObject.layers[1] ? this.map.fitBounds(this.mapObject.layers[1].getBounds()) : null;

  }

}
