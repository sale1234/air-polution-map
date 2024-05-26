import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { MAP_TILER_TOKEN, WAQI_TOKEN } from '../tokens/maptiler.token';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private readonly token = MAP_TILER_TOKEN;

  private initMap(): void {
    this.map = L.map('map').setView([50, 10], 4);

    L.tileLayer(
      `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${this.token}`,
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution:
          '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        crossOrigin: true,
      }
    ).addTo(this.map)

    const WAQI_URL = `https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${WAQI_TOKEN}`;
    const WAQI_ATTR =
      'Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>';
    const waqiLayer = L.tileLayer(WAQI_URL, { attribution: WAQI_ATTR });

    this.map.addLayer(waqiLayer);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}