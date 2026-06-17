"use client";

import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ sites }: { sites: any[] }) {
  return (
    <MapContainer 
      center={[22, 60]} 
      zoom={3} 
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      scrollWheelZoom={false}
    >
      {/* LayersControl adds a toggle menu to the top right of the map */}
      <LayersControl position="topright">
        
        {/* 1. Standard Google Streets (Set as Default using the 'checked' prop) */}
        <LayersControl.BaseLayer checked name="Google Maps (Streets)">
          <TileLayer
            attribution='&copy; Google Maps'
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>

        {/* 2. Google Satellite Hybrid */}
        <LayersControl.BaseLayer name="Google Satellite Hybrid">
          <TileLayer
            attribution='&copy; Google Maps'
            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>

        {/* 3. CartoDB Dark Matter (Great for Dark Mode) */}
        <LayersControl.BaseLayer name="Dark Mode (CartoDB)">
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>

        {/* 4. Esri World Street Map */}
        <LayersControl.BaseLayer name="Esri World Street Map">
          <TileLayer
            attribution='&copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

      </LayersControl>

      {/* Render the Markers on top of whichever BaseLayer is currently active */}
      {sites.map((site) => (
        <Marker key={site.id} position={site.coords}>
          <Popup>
            <div className="font-bold text-foreground">{site.name}</div>
            <div className="text-sm text-muted-foreground">{site.location}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}