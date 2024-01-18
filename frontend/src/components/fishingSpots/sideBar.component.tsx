import { ReactElement } from "react";
import { CoordsCustom } from "./sideBar.type";
import SpotCustom from "./spotCustom.component";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";

interface SideBarProps {
  handleClick: (newCoords: CoordsCustom) => void;
  fishingSpots: FishingSpot[];
  onDelete: (id: string) => void;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps): ReactElement => {
  return (
    <div className="bg-gray-200 p-4 w-1/5">
      <h2 className="font-bold text-xl mb-4">Your Fishing Spots</h2>
      <div className="sidebar-scroll max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-300 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        {props.fishingSpots.map((spot) => (
          <ButtonCustom
            className="w-full"
            key={spot._id}
            onClick={() =>
              props.handleClick({ lng: spot.longitude, lat: spot.latitude })
            }
          >
            <SpotCustom spot={spot} onDelete={props.onDelete} />
          </ButtonCustom>
        ))} 
      </div>
    </div>
  );
};

export default SideBar;
