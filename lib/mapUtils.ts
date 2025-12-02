/**
 * Map utilities for initializing and configuring ESRI maps
 */

import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

interface MapConfig {
  center?: [number, number];
  zoom?: number;
  basemap?: string;
}

/**
 * Create and initialize a map view
 */
export function initializeMap(
  container: HTMLDivElement,
  config: MapConfig = {}
): MapView {
  const {
    center = [-118.2437, 34.0522],
    zoom = 12,
    basemap = "streets-night-vector",
  } = config;

  const map = new Map({
    basemap: basemap,
  });

  const view = new MapView({
    map: map,
    container: container,
    center: center,
    zoom: zoom,
  });

  return view;
}

/**
 * Destroy map view and cleanup resources
 */
export function destroyMap(view: MapView): void {
  if (view) {
    view.destroy();
  }
}
