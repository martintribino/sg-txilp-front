import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import Vector from 'ol/layer/Vector';
import { OSM, Vector as VectorS } from 'ol/source';
import { transform } from 'ol/proj';
import View from 'ol/View';
import { ICoordinadas } from 'src/app/interface/interface.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.styl'],
})
export class MapComponent implements AfterViewInit {
  @Input() latitud: number;
  @Input() longitud: number;
  @Output() clickMap = new EventEmitter();
  private mapa: Map;

  constructor() {}

  ngAfterViewInit(): void {
    var vtLayer = new TileLayer({
      source: new OSM(),
    });
    var vectorSource = new VectorS({});
    var vectorLayer = new Vector({
      source: vectorSource,
    });
    this.mapa = new Map({
      target: 'map',
      layers: [vtLayer],
      source: vectorSource,
      view: new View({
        center: [this.longitud, this.latitud],
        zoom: 1,
      }),
    });
    this.mapa.addLayer(vectorLayer);
    this.mapa.on('singleclick', this.onSingleClick);
  }

  private onSingleClick = (event) => {
    // convert coordinate to EPSG-4326
    let res = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
    let coord: ICoordinadas = {
      latitud: res[1],
      longitud: res[0],
    };
    this.clickMap.emit(coord);
  };
}
