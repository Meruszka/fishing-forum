import React, { ReactElement, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SideBar from "./sideBar";
import { Coords } from "./sideBar.type";

const FishingSpots: React.FC = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [coords, setCoords] = useState<Coords>({ lat: 54.0364, lng: 21.7667 });

  const handleClick = (newCoords: Coords) => {
    setCoords(newCoords);
    map.flyTo(newCoords, 13, {
      duration: 2,
    });
  };

  return (
    <div className="h-screen flex">
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        scrollWheelZoom={true}
        ref={setMap}
        className="w-full h-screen"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="w-1/5">
        <SideBar handleClick={handleClick} />
      </div>
    </div>
  );
};

export default FishingSpots;
