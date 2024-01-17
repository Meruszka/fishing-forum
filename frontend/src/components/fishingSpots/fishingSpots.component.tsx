import React, { ReactElement, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SideBar from "./sideBar.component";
import { CoordsCustom } from "./sideBar.type";
import { Map } from "leaflet";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";
import LoadingScreen from "../../common/loadingScreen/loadingScreen.component";
import { useApiClient } from "../../providers/api/apiContext.hook";
import {
  FishingSpotDTO,
  deleteFishingSpotREST,
  getFishingSpotsREST,
  newFishingSpotREST,
} from "./fishingSpots.service";
import { ImBin } from "react-icons/im";
import AddingFishingspot from "./addingFishingSpot.component";
import AddingFishingSpotModal from "./addingFishingSpotModal.component";

const FishingSpots: React.FC = (): ReactElement => {
  const mapRef = useRef<Map | null>(null);
  const [coords, setCoords] = useState<CoordsCustom>({
    lat: 54.0364,
    lng: 21.7667,
  });
  const [inAddingMode, setInAddingMode] = useState<boolean>(false);
  const [newSpotCoords, setNewSpotCoords] = useState<CoordsCustom>(
    {} as CoordsCustom
  );
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

  if (!user) {
    return <LoadingScreen />;
  }

  const handleNewSpot = async (newSpot: FishingSpotDTO) => {
    const newSpotReponse = await newFishingSpotREST(apiClient, newSpot);
    setFishingSpots((prev) => [...prev, newSpotReponse]);
    setInAddingMode(false);
  };

  const handleClick = (newCoords: CoordsCustom) => {
    setCoords(newCoords);
    if (mapRef.current) {
      mapRef.current.flyTo(newCoords, 13, {
        duration: 2,
      });
    }
  };

  const handleDeleteSpot = (id: string) => {
    deleteFishingSpotREST(apiClient, id);
  };

  // 5rem is not ideal, but it's a quick fix for now
  return (
    <div className="h-[calc(100vh-5rem)] flex z-0">
      <AddingFishingSpotModal
        isOpen={inAddingMode}
        onClose={() => setInAddingMode(false)}
        onConfirm={handleNewSpot}
        coords={newSpotCoords}
      />
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
        <AddingFishingspot
          isAdding={inAddingMode}
          setIsAdding={setInAddingMode}
          setCoords={setNewSpotCoords}
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
          onDelete={handleDeleteSpot}
        />
      </div>
    </div>
  );
};

export default FishingSpots;
