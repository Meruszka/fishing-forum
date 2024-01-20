import React, { ReactElement, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CoordsCustom } from "./sideBar/sideBar.type";
import { Map } from "leaflet";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";
import { useApiClient } from "../../providers/api/apiContext.hook";
import {
  FishingSpotDTO,
  deleteFishingSpotREST,
  getFishingSpotsREST,
  newFishingSpotREST,
} from "./fishingSpots.service";
import AddingFishingspot from "./modal/addingFishingSpot.component";
import AddingFishingSpotModal, {
  ModalOpenType,
} from "./modal/addingFishingSpotModal.component";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import SideBar from "./sideBar/sideBar.component";
import LinkCustom from "../../common/linkCustom/LinkCustom.component";

const FishingSpots: React.FC = (): ReactElement => {
  const mapRef = useRef<Map | null>(null);
  const [coords, setCoords] = useState<CoordsCustom>({
    lat: 54.0364,
    lng: 21.7667,
  });
  const [isModalVisable, setIsModalVisable] = useState<ModalOpenType>({
    isOpen: false,
    type: "add",
    initialSpot: {} as FishingSpotDTO,
  });
  const [newSpotCoords, setNewSpotCoords] = useState<CoordsCustom>(
    {} as CoordsCustom
  );
  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const { apiClient, isLoggedIn } = useApiClient();

  useEffect(() => {
    getFishingSpotsREST(apiClient).then((spots) => {
      setFishingSpots(spots);
    });
  }, [apiClient]);

  useEffect(() => {
    mapRef.current?.invalidateSize();
  }, [isSidebarExpanded]);

  const handleConfim = async (newSpot: FishingSpotDTO) => {
    console.log(newSpot);
    try {
      const newSpotReponse = await newFishingSpotREST(apiClient, {
        ...newSpot,
        rating: Number(newSpot.rating),
        latitude: newSpot.latitude ? newSpot.latitude : newSpotCoords.lat,
        longitude: newSpot.longitude ? newSpot.longitude : newSpotCoords.lng,
      });
      setFishingSpots((prev) => [...prev, newSpotReponse]);
      setIsModalVisable({ isOpen: false } as ModalOpenType);
    } catch (error) {
      console.error("Error creating new fishing spot:", error);
    }
  };

  const handleSelectSpot = (newCoords: CoordsCustom) => {
    setCoords(newCoords);
    if (mapRef.current) {
      mapRef.current.flyTo(newCoords, 10, {
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
    }
  };

  const handleEditSpot = (id: string) => {
    const spotToEdit = fishingSpots.find((spot) => spot._id === id);
    if (spotToEdit) {
      setIsModalVisable({
        isOpen: true,
        type: "edit",
        initialSpot: spotToEdit,
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-row-reverse overflow-hidden relative">
      <AddingFishingSpotModal
        modalOptions={isModalVisable}
        onClose={() => setIsModalVisable({ isOpen: false } as ModalOpenType)}
        onConfirm={handleConfim}
      />
      <div
        className={`lg:w-1/4 ${
          isSidebarExpanded ? "" : "hidden"
        } p-4 bg-gray-700 h-[calc(100vh-72px)]`}
      >
        <SideBar
          handleClick={handleSelectSpot}
          fishingSpots={fishingSpots}
          onDelete={handleDeleteSpot}
          onEdit={handleEditSpot}
        />
      </div>
      <ButtonCustom
        className="absolute top-15 right-4 z-10"
        type="default"
        onClick={toggleSidebar}
      >
        {isSidebarExpanded ? "Hide Sidebar" : "Show Sidebar"}
      </ButtonCustom>
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={10}
        scrollWheelZoom={true}
        ref={mapRef}
        style={{ zIndex: 0, height: "calc(100vh - 72px)", width: "100vw" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {isLoggedIn ? (
          <AddingFishingspot
            isAdding={isModalVisable}
            setIsAdding={setIsModalVisable}
            setCoords={setNewSpotCoords}
          />
        ) : null}

        {fishingSpots.map((spot: FishingSpot) => (
          <Marker key={spot._id} position={[spot.latitude, spot.longitude]}>
            <Popup>
              <div className="flex w-fit min-w-32">
                <div>
                  <div>
                    <div className="font-bold text-xl mb-4">
                      <LinkCustom
                        className="mt-2 text-blue-500 hover:underline"
                        to={`/user-profile/${spot.author._id}`}
                      >
                        {spot.author.username}
                      </LinkCustom>
                      <div>{spot.name}</div>
                    </div>
                    <div className="text-gray-700">{spot.description}</div>
                  </div>
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
