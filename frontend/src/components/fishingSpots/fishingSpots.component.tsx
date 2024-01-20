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
  updateFishingSpotREST,
} from "./fishingSpots.service";
import AddingFishingspot from "./modal/addingFishingSpot.component";
import AddingFishingSpotModal, {
  ModalOpenType,
} from "./modal/addingFishingSpotModal.component";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import SideBar from "./sideBar/sideBar.component";
import ProfileLinkCustom from "../../common/profileLinkCustom/profileLinkCustom.component";

const FishingSpots: React.FC = (): ReactElement => {
  const mapRef = useRef<Map | null>(null);
  const [coords, setCoords] = useState<CoordsCustom>({
    lat: 54.0364,
    lng: 21.7667,
  });
  const [isModalVisible, setIsModalVisible] = useState<ModalOpenType>({
    isOpen: false,
    type: "add",
    initialSpot: {} as FishingSpotDTO,
  });
  const [newSpotCoords, setNewSpotCoords] = useState<CoordsCustom>(
    {} as CoordsCustom
  );
  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const [selectedSpotId, setSelectedSpotId] = useState<string>("");
  const { apiClient, isLoggedIn } = useApiClient();

  useEffect(() => {
    getFishingSpotsREST(apiClient).then((spots) => {
      setFishingSpots(spots);
    });
  }, [apiClient]);

  useEffect(() => {
    mapRef.current?.invalidateSize();
  }, [isSidebarExpanded]);

  const handleConfirm = async (
    newSpot: FishingSpotDTO,
    type: "add" | "edit"
  ) => {
    try {
      const newSpotRequest = {
        ...newSpot,
        rating: Number(newSpot.rating),
        latitude: newSpot.latitude ? newSpot.latitude : newSpotCoords.lat,
        longitude: newSpot.longitude ? newSpot.longitude : newSpotCoords.lng,
      };

      let result: FishingSpot;

      if (type === "add") {
        result = await newFishingSpotREST(apiClient, newSpotRequest);
      } else if (type === "edit") {
        result = await updateFishingSpotREST(
          apiClient,
          selectedSpotId,
          newSpotRequest
        );
      }
      setFishingSpots((prev) => [
        ...prev.filter((e) => e._id != selectedSpotId),
        result,
      ]);
      setIsModalVisible({ isOpen: false } as ModalOpenType);
      setSelectedSpotId("");
    } catch (error) {
      console.error("Error handling fishing spot:", error);
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
    setSelectedSpotId(id);
    if (spotToEdit) {
      setIsModalVisible({
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
        modalOptions={isModalVisible}
        onClose={() => setIsModalVisible({ isOpen: false } as ModalOpenType)}
        onConfirm={handleConfirm}
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
            isAdding={isModalVisible}
            setIsAdding={setIsModalVisible}
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
                      <ProfileLinkCustom
                        imageUrl={spot.author.profilePicture}
                        to={`/user-profile/${spot.author._id}`}
                        alt="Profile Picture"
                        type="small"
                      />
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

