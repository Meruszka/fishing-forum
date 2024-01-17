import React, { ReactElement, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SideBar from "./sideBar.component";
import { Coords } from "./sideBar.type";
import { Map } from "leaflet";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";
import LoadingScreen from "../../common/loadingScreen/loadingScreen.component";
import { useApiClient } from "../../providers/api/apiContext.hook";
import {
  FishingSpotDTO,
  getFishingSpotsREST,
  newFishingSpotREST,
} from "./fishingSpots.service";
import { ImBin } from "react-icons/im";

const FishingSpots: React.FC = (): ReactElement => {
  const mapRef = useRef<Map | null>(null);
  const [coords, setCoords] = useState<Coords>({ lat: 54.0364, lng: 21.7667 });
  const [inAddingMode, setInAddingMode] = useState<boolean>(false);
  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);
  const user = useCurrentUser();
  const apiClient = useApiClient();

  useEffect(() => {
    if (user) {
      getFishingSpotsREST(apiClient).then((spots) => {
        setFishingSpots(spots);
      });
    }
  }, [apiClient, user]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("click", (e) => {
        if (inAddingMode) {
          const newSpot: FishingSpotDTO = {
            name: "Test spot",
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
            description: "Test",
            rating: 5,
            type: "river",
            image: "https://picsum.photos/200/300",
          };
          newFishingSpotREST(apiClient, newSpot);
        }
      });
    }
  }, [apiClient, inAddingMode, user]);

  if (!user) {
    return <LoadingScreen />;
  }

  const handleClick = (newCoords: Coords) => {
    setCoords(newCoords);
    if (mapRef.current) {
      mapRef.current.flyTo(newCoords, 13, {
        duration: 2,
      });
    }
  };

  const handleDeleteSpot = (id: string) => {
    console.log(id);
  };

  if (!user) {
    return <LoadingScreen />;
  }

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
        {fishingSpots.map((spot: FishingSpot) => {
          return (
            <div key={spot._id}>
              <Marker position={[spot.latitude, spot.longitude]}>
                <Popup>
                  <div className="flex w-fit">
                    <div>
                      <h2 className="font-bold text-xl mb-4">{spot.name}</h2>
                      <p className="text-gray-700">{spot.description}</p>
                      <button
                        className="bg-red-500 text-white px-4 py-2 mt-2"
                        onClick={() => handleDeleteSpot(spot._id)}
                      >
                        <ImBin />
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
      <div className="w-1/5">
        <SideBar
          handleClick={handleClick}
          fishingSpots={fishingSpots}
          inAddingMode={inAddingMode}
          setInAddingMode={setInAddingMode}
          onDelete={handleDeleteSpot}
        />
      </div>
    </div>
  );
};

export default FishingSpots;
