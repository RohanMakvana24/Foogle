/**  * RotatingLocationMap — 3D street/satellite map of Foogle Cafe in Panchwati, Udaipur.
 * The view is static (no auto-rotation); visitors can drag, zoom and switch layers.
 * Powered by MapLibre GL with high-speed, zero-downtime OpenStreetMap & ESRI Satellite tile layers.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  RotateCcw,
  Plus,
  Minus,
  Navigation,
  ExternalLink,
  Compass,
  Layers,
} from 'lucide-react';
import { FOOGLE_BUSINESS_INFO } from '../../data/businessInfo';

// Confirmed geographic coordinates of Foogle in Panchwati, Udaipur, Rajasthan (north of Panchwati Chowk, south of canal)
const FOOGLE_COORDINATES: [number, number] = [73.68938, 24.59838];

// maplibre-gl v6 ships its worker as a sibling ES module that the bundler does
// not emit, so point it at the copy served from /public (kept version-matched).
if (typeof window !== 'undefined') {
  try {
    maplibregl.setWorkerUrl('/maplibre-gl-worker.mjs');
  } catch (_) {
    // ignore if already set
  }
}

// High-speed street style with multi-domain load balancing
const STREET_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm-tiles-layer',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

// High-definition satellite style
const SATELLITE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    'esri-satellite': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution: '&copy; Esri &copy; DigitalGlobe',
    },
  },
  layers: [
    {
      id: 'esri-satellite-layer',
      type: 'raster',
      source: 'esri-satellite',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export const RotatingLocationMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [mapMode, setMapMode] = useState<'street' | 'satellite'>('street');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Create custom marker helper with bottom tip anchor directly on coordinates
  const createMarkerElement = useCallback(() => {
    const el = document.createElement('div');
    el.className = 'foogle-custom-map-marker';
    el.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; user-select: none;">
        <!-- Top Branded Floating Badge -->
        <div style="margin-bottom: 5px; padding: 4px 11px; background: rgba(24, 59, 43, 0.95); border: 1.5px solid rgba(245, 158, 11, 0.85); border-radius: 9999px; color: #FFFFFF; font-size: 11px; font-weight: 800; white-space: nowrap; box-shadow: 0 4px 16px rgba(0,0,0,0.35); display: flex; align-items: center; gap: 5px; backdrop-filter: blur(8px);">
          <span style="color: #F59E0B; font-size: 8px;">●</span> Foogle Cafe · Panchwati
        </div>

        <!-- Pin Icon Disc with Radar Waves -->
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: #183B2B; border: 2.5px solid #F59E0B; box-shadow: 0 10px 25px rgba(0,0,0,0.45); font-size: 20px;">
          <div style="position: absolute; inset: -4px; border-radius: 50%; background: rgba(245, 158, 11, 0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; z-index: -1;"></div>
          🍔
        </div>

        <!-- Pin Pointer Stem (points down to the ground) -->
        <div style="width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-top: 10px solid #F59E0B; margin-top: -1px;"></div>

        <!-- Ground Contact Shadow Dot -->
        <div style="width: 10px; height: 4px; border-radius: 50%; background: rgba(0,0,0,0.35); margin-top: 1px;"></div>
      </div>
    `;

    el.addEventListener('click', () => {
      window.open(FOOGLE_BUSINESS_INFO.location.googleMapsSearchUrl, '_blank', 'noopener,noreferrer');
    });

    return el;
  }, []);

  // Initialize Map
  useEffect(() => {
    const ml = (typeof window !== 'undefined' && (window as any).maplibregl) || maplibregl;
    const initialStyle = mapMode === 'satellite' ? SATELLITE_STYLE : STREET_STYLE;

    const map = new ml.Map({
      container: mapContainerRef.current,
      style: initialStyle,
      center: FOOGLE_COORDINATES,
      zoom: 17.5,
      pitch: 35,
      bearing: 0,
      maxPitch: 60,
      attributionControl: false,
      fadeDuration: 0,
      // Cap the internal render resolution on high-DPI phones (big fill-rate win).
      pixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5),
    });

    mapRef.current = map;

    map.on('load', () => {
      setIsLoaded(true);

      // Add custom branded marker anchored at bottom tip
      const markerElement = createMarkerElement();
      const marker = new ml.Marker({ element: markerElement, anchor: 'bottom' })
        .setLngLat(FOOGLE_COORDINATES)
        .addTo(map);

      markerRef.current = marker;

      // Force canvas size update
      map.resize();
    });

    map.on('error', () => {
      // Graceful error fallback
    });

    // ResizeObserver to ensure map never goes blank when layout changes
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [createMarkerElement]);

  // Handle switching between Street and Satellite modes
  const handleToggleMapMode = useCallback(() => {
    const nextMode = mapMode === 'street' ? 'satellite' : 'street';
    setMapMode(nextMode);

    if (mapRef.current) {
      const nextStyle = nextMode === 'satellite' ? SATELLITE_STYLE : STREET_STYLE;
      mapRef.current.setStyle(nextStyle);

      // Re-attach marker after style update
      mapRef.current.once('style.load', () => {
        if (mapRef.current) {
          const ml = (typeof window !== 'undefined' && (window as any).maplibregl) || maplibregl;
          const markerElement = createMarkerElement();
          const marker = new ml.Marker({ element: markerElement, anchor: 'bottom' })
            .setLngLat(FOOGLE_COORDINATES)
            .addTo(mapRef.current);
          markerRef.current = marker;
          mapRef.current.resize();
        }
      });
    }
  }, [mapMode, createMarkerElement]);

  const resetToCenter = useCallback(() => {
    if (!mapRef.current) return;
    mapRef.current.easeTo({
      center: FOOGLE_COORDINATES,
      zoom: 17.5,
      pitch: 35,
      bearing: 0,
      duration: 1000,
    });
  }, []);

  const zoomIn = useCallback(() => {
    mapRef.current?.zoomIn({ duration: 300 });
  }, []);

  const zoomOut = useCallback(() => {
    mapRef.current?.zoomOut({ duration: 300 });
  }, []);

  return (
    <div
      className="relative w-full h-[440px] sm:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden border shadow-xl flex flex-col justify-between select-none"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* MapLibre Canvas Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Top Right: Only Satellite Mode Switcher Button */}
      <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 pointer-events-auto">
        <button
          type="button"
          onClick={handleToggleMapMode}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 92%, transparent)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
          title={mapMode === 'street' ? 'Switch to Satellite View' : 'Switch to Street View'}
        >
          <Layers className="w-3.5 h-3.5 text-amber-500" />
          <span className="capitalize">{mapMode === 'street' ? 'Satellite' : 'Streets'}</span>
        </button>
      </div>

      {/* Floating Right Map Controls (Zoom + Recenter) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom In"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 90%, transparent)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom Out"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 90%, transparent)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={resetToCenter}
          aria-label="Re-center Foogle"
          title="Re-center on Foogle"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer text-amber-500"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 90%, transparent)',
            borderColor: 'var(--color-border)',
          }}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Overlay Bar */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Subtle Hint */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-medium shadow-sm pointer-events-auto"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-bg-surface) 88%, transparent)',
            borderColor: 'var(--color-border-subtle)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>Drag to explore · Pinch to zoom</span>
        </div>

        {/* Live Directions Link Pill */}
        <a
          href={FOOGLE_BUSINESS_INFO.location.googleMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 shadow-md text-white pointer-events-auto cursor-pointer"
          style={{
            backgroundColor: 'var(--color-brand-primary)',
          }}
        >
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span>Open Directions</span>
          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
        </a>
      </div>
    </div>
  );
};

export default RotatingLocationMap;
