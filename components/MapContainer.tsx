"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MapContainer.module.css";

export default function MapContainer() {
  const mapDiv = useRef<HTMLDivElement>(null);
  const viewRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only load on client side
    const loadMap = async () => {
      try {
        // Dynamically import both 2D and 3D classes so we can handle either portal item type
        const [{ default: MapView }, { default: WebMap }] = await Promise.all([
          import("@arcgis/core/views/MapView"),
          import("@arcgis/core/WebMap"),
        ]);

        const [{ default: SceneView } = {} as any, { default: WebScene } = {} as any] = await Promise.all([
          import("@arcgis/core/views/SceneView").catch(() => ({})),
          import("@arcgis/core/WebScene").catch(() => ({})),
        ]);

        // Load CSS dynamically (match ArcGIS API version)
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://js.arcgis.com/4.34.8/esri/themes/light/main.css";
        document.head.appendChild(link);

        if (!mapDiv.current) return;

        // Option: use a local WebScene focused on Singapore (latitude 1.3521, longitude 103.8198)
        const useLocalScene = true;
        if (useLocalScene) {
          if (!WebScene || !SceneView) {
            console.error("WebScene/SceneView modules not available for local 3D scene.");
          } else {
            const webScene = new WebScene({
              basemap: "arcgis-imagery", // imagery basemap for a 3D view
              ground: "world-elevation",
            });

            const view = new SceneView({
              map: webScene,
              container: mapDiv.current,
              camera: {
                position: {
                  latitude: 1.3521,
                  longitude: 103.8198,
                  z: 2500,
                },
                tilt: 45,
                heading: 0,
              },
            });

            viewRef.current = view;
            setIsLoaded(true);
            return;
          }
        }

        const portalItemId = "32b8ebd196bf42d0b0eebb17bb7b201c"; // fallback portal item

        // First try to create a WebMap + MapView. If the portal item is actually a Web Scene,
        // the WebMap constructor will throw an error; in that case fall back to WebScene + SceneView.
        try {
          const webMap = new WebMap({
            portalItem: {
              id: portalItemId,
            },
          });

          // Create a 2D map view
          const view = new MapView({
            map: webMap,
            container: mapDiv.current,
            center: [-118.2437, 34.0522], // Los Angeles
            zoom: 12,
          });

          viewRef.current = view;
          setIsLoaded(true);
          return;
        } catch (err: any) {
          // If the portal item is a Web Scene, fall back to WebScene + SceneView
          const msg: string = err && err.message ? String(err.message) : "";
          if (msg.includes("Web Scene") || msg.includes("Invalid portal item type")) {
            if (!WebScene || !SceneView) {
              throw new Error("WebScene/SceneView not available to render a Web Scene portal item.");
            }

            const webScene = new WebScene({
              portalItem: {
                id: portalItemId,
              },
            });

            const view = new SceneView({
              map: webScene,
              container: mapDiv.current,
              center: [-118.2437, 34.0522],
              zoom: 12,
            });

            viewRef.current = view;
            setIsLoaded(true);
            return;
          }

          // rethrow other errors
          throw err;
        }
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    loadMap();

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapDiv} className={styles.mapDiv} />
      <div className={styles.info}>
        <h1>ESRI ArcGIS Map</h1>
        <p>Built with Next.js and ArcGIS JavaScript API</p>
      </div>
    </div>
  );
}
