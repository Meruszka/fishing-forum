import { ReactElement, useState } from "react";
import { Coords, Spot, getInitialSpots } from "./sideBar.type";
import SpotCustom from "./spotCustom";
import ButtonCustom from "../buttonCustom/buttonCustom";

interface SideBarProps {
  handleClick: (newCoords: Coords) => void;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps): ReactElement => {
  const [spots] = useState<Spot[]>(getInitialSpots());

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="font-bold text-xl mb-4">Your Fishing Spots</h2>
      <ul>
        {spots.map((spot) => (
          <ButtonCustom
            key={spot.id}
            onClick={() => props.handleClick({ lng: spot.lng, lat: spot.lat })}
          >
            <SpotCustom spot={spot} />
          </ButtonCustom>
        ))}
      </ul>
      <h2 className="font-bold text-xl mb-4">Add Fishing Spot</h2>
    </div>
  );
};

export default SideBar;
