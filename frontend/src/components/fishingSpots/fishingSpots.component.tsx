import React, { ReactElement, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SideBar from "./sideBar.component";
import { Coords } from "./sideBar.type";
import { Map, Marker, Popup } from "leaflet";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";

const FishingSpots: React.FC = (): ReactElement => {
  const mapRef = useRef<Map | null>(null);
  const [coords, setCoords] = useState<Coords>({ lat: 54.0364, lng: 21.7667 });
  const user = useCurrentUser();

  const handleClick = (newCoords: Coords) => {
    setCoords(newCoords);
    if (mapRef.current) {
      mapRef.current.flyTo(newCoords, 13, {
        duration: 2,
      });
    }
  };

  // 5rem is not ideal, but it's a quick fix for now
  return (
    <div className="h-[calc(100vh-5rem)] flex z-0">
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        scrollWheelZoom={true}
        ref={mapRef}
        className="w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {user &&
          user.fishingSpots.map((spot) => {
            return (
              <Marker
                key={spot.id}
                position={[spot.coords.lat, spot.coords.lng]}
                eventHandlers={{
                  click: () => {
                    handleClick(spot.coords);
                  },
                }}
              >
                <Popup>{spot.name}</Popup>
              </Marker>
            );
          })}
      </MapContainer>
      <div className="w-1/5">
        <SideBar handleClick={handleClick} />
      </div>
    </div>
  );
};

export default FishingSpots;
