import { ReactElement, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { CoordsCustom } from "../sideBar/sideBar.type";
import { LatLng } from "leaflet";
import { ModalOpenType } from "./addingFishingSpotModal.component";

interface AddingFishingspotProps {
  isAdding: ModalOpenType;
  setIsAdding: (obj: ModalOpenType) => void;
  setCoords: (coords: CoordsCustom) => void;
}

const AddingFishingspot: React.FC<AddingFishingspotProps> = (
  props: AddingFishingspotProps
): ReactElement | null => {
  const [position, setPosition] = useState<LatLng | null>(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      props.setIsAdding({ isOpen: true, type: "add" } as ModalOpenType);
      props.setCoords(e.latlng);
    },
  });

  if (!props.isAdding.isOpen) {
    return null;
  }

  return position === null ? null : (
    <>
      <Marker position={position}></Marker>
    </>
  );
};

export default AddingFishingspot;
