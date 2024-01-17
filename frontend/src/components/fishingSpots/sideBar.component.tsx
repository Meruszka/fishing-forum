import { ReactElement, useEffect, useState } from "react";
import { Coords, getInitialSpots } from "./sideBar.type";
import SpotCustom from "./spotCustom.component";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";

interface SideBarProps {
  handleClick: (newCoords: Coords) => void;
  fishingSpots: FishingSpot[];
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps): ReactElement => {
  // const [spots, setSpots] = useState<Spot[]>(getInitialSpots());
  // // const user = useCurrentUser();
  // useEffect(() => {
  //   setSpots(getInitialSpots());
  // }, []);
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
