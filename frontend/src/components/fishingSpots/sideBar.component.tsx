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
    <>
      <h2 className="font-bold text-xl mb-4 text-white">Your Fishing Spots</h2>
      <div className="sidebar-scroll max-h-[calc(100%-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-300 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 snap-y">
        {props.fishingSpots.map((spot) => (
          <ButtonCustom
            className="w-full snap-center"
            key={spot._id}
            onClick={() =>
              props.handleClick({ lng: spot.longitude, lat: spot.latitude })
            }
          >
            <SpotCustom spot={spot} onDelete={props.onDelete} />
          </ButtonCustom>
        ))}
      </div>
    </>
  );
};

export default SideBar;
