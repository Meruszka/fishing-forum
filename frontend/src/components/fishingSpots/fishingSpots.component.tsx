import React, { ReactElement, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import SideBar from "./sideBar.component";

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
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
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
    try {
      const newSpotReponse = await newFishingSpotREST(apiClient, {
        ...newSpot,
        latitude: newSpotCoords.lat,
        longitude: newSpotCoords.lng,
      });
      setFishingSpots((prev) => [...prev, newSpotReponse]);
      setInAddingMode(false);
    } catch (error) {
      console.error("Error creating new fishing spot:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleClick = (newCoords: CoordsCustom) => {
    setCoords(newCoords);
    if (mapRef.current) {
      mapRef.current.flyTo(newCoords, 13, {
        duration: 2,
      });
    }
  };

  const handleDeleteSpot = async (id: string) => {
    try {
      await deleteFishingSpotREST(apiClient, id);
      setFishingSpots((prev) => prev.filter((spot) => spot._id !== id));
    } catch (error) {
      console.error("Error deleting fishing spot:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
    mapRef.current?.invalidateSize();
  };

  return (
    <div className="flex flex-row-reverse overflow-hidden relative">
      <AddingFishingSpotModal
        isOpen={inAddingMode}
        onClose={() => setInAddingMode(false)}
        onConfirm={handleNewSpot}
      />
      <div
        className={`lg:w-1/4 ${
          isSidebarExpanded ? "" : "hidden"
        } p-4 bg-gray-700 h-[calc(100vh-72px)]`}
      >
        <SideBar
          handleClick={handleClick}
          fishingSpots={fishingSpots}
          onDelete={handleDeleteSpot}
        />
      </div>
      <button
        className="absolute top-15 right-0 m-4 p-2 bg-blue-500 text-white rounded-full z-10"
        onClick={toggleSidebar}
      >
        {isSidebarExpanded ? "Hide Sidebar" : "Show Sidebar"}
      </button>
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        scrollWheelZoom={true}
        ref={mapRef}
        style={{ zIndex: 0, height: "calc(100vh - 72px)", width: "100vw" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddingFishingspot
          isAdding={inAddingMode}
          setIsAdding={setInAddingMode}
          setCoords={setNewSpotCoords}
        />

        {fishingSpots.map((spot: FishingSpot) => (
          <Marker key={spot._id} position={[spot.latitude, spot.longitude]}>
            <Popup>
              <div className="flex w-fit min-w-32">
                <div>
                  <h2 className="font-bold text-xl mb-4">{spot.name}</h2>
                  <p className="text-gray-700">{spot.description}</p>
                  <ButtonCustom
                    type="removal"
                    onClick={() => handleDeleteSpot(spot._id)}
                  >
                    <ImBin />
                  </ButtonCustom>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FishingSpots;
