import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";

function RecenterMap({ lat, long }: { lat: number; long: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, long]);
  }, [lat, long, map]);
  return null;
}

export default function Map({ ipInfo }: { ipInfo: any }) {
  const lat = ipInfo?.latitude || 10.294034624204446;
  const long = ipInfo?.longitude || 123.90248215933933;
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gray-900 p-6 rounded-2xl" style={{ minHeight: 400 }}>
        <h2 className="text-lg font-semibold mb-4">Map</h2>

        <MapContainer
          center={[lat, long]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[lat, long]}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconRetinaUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
              shadowUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>Hello</Popup>
          </Marker>
          <RecenterMap lat={lat} long={long} />
        </MapContainer>
      </div>
    </div>
  );
}
