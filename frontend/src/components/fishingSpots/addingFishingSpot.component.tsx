import { ReactElement, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { CoordsCustom } from "./sideBar.type";
import { LatLng } from "leaflet";

interface AddingFishingspotProps {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
  setCoords: (coords: CoordsCustom) => void;
}

const AddingFishingspot: React.FC<AddingFishingspotProps> = (
  props: AddingFishingspotProps
): ReactElement | null => {
  const [position, setPosition] = useState<LatLng | null>(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      props.setIsAdding(true);
      props.setCoords(e.latlng);
    },
  });
  if (!props.isAdding) {
    return null;
  }

  return position === null ? null : (
    <>
      <Marker position={position}></Marker>
    </>
  );
};

export default AddingFishingspot;
