import { ReactElement } from "react";
import { Coords } from "./sideBar.type";
import SpotCustom from "./spotCustom.component";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";

interface SideBarProps {
  handleClick: (newCoords: Coords) => void;
  fishingSpots: FishingSpot[];
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps): ReactElement => {
  return (
    <div className="bg-gray-200 p-4">
      <h2 className="font-bold text-xl mb-4">Your Fishing Spots</h2>
      <ul>
        {props.fishingSpots.map((spot) => (
          <ButtonCustom
            key={spot._id}
            onClick={() =>
              props.handleClick({ lng: spot.longitude, lat: spot.latitude })
            }
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
