import React, { ReactElement, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SideBar from "./sideBar.component";
import { Coords } from "./sideBar.type";
import { Map } from "leaflet";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";

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

  if (!user) {
    return <div>Loading...</div>;
  }
  user.fishingSpots = [
    {
      _id: "1",
      name: "Test spot",
      latitude: 54.0364,
      longitude: 31.7667,
      description: "Test",
      rating: 5,
      type: "river",
      image: "https://picsum.photos/200/300",
      author: user,
    },
  ];

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
          user.fishingSpots.map((spot: FishingSpot) => {
            return (
              <div key={spot._id}>
                <Marker position={[spot.latitude, spot.longitude]}>
                  <Popup>
                    <div className="flex">
                      <img
                        src={spot.image}
                        className="h-16 w-16 object-cover mr-4"
                        alt={spot.name}
                      />
                      <div>
                        <h2 className="font-bold text-xl mb-4">{spot.name}</h2>
                        <p className="text-gray-700">{spot.description}</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </div>
            );
          })}
      </MapContainer>
      <div className="w-1/5">
        <SideBar handleClick={handleClick} fishingSpots={user.fishingSpots} />
      </div>
    </div>
  );
};

export default FishingSpots;
