import { ReactElement } from "react";
import { CoordsCustom } from "./sideBar.type";
import { FishingSpot } from "../../../providers/currentUser/currentUser.type";
import ButtonCustom from "../../../common/buttonCustom/buttonCustom.component";
import { ImBin } from "react-icons/im";
import { BiEditAlt } from "react-icons/bi";
import { useCurrentUser } from "../../../providers/currentUser/currentUser.hook";

interface SideBarProps {
  handleClick: (newCoords: CoordsCustom) => void;
  fishingSpots: FishingSpot[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps): ReactElement => {
  const user = useCurrentUser();
  return (
    <>
      <h2 className="font-bold text-xl mb-4 text-white">Your Fishing Spots</h2>
      <div className="sidebar-scroll max-h-[calc(100%-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-300 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 snap-y">
        {props.fishingSpots.map((spot) => (
          <div
            className="w-full snap-center hover:bg-gray-600 p-2 rounded-md hover:shadow-lg transition duration-300 ease-in-out relative hover:cursor-pointer"
            key={spot._id}
            onClick={() =>
              props.handleClick({ lng: spot.longitude, lat: spot.latitude })
            }
          >
            <div className="flex bg-white shadow-md rounded-md hover:shadow-lg transition duration-300 ease-in-out relative">
              <img
                src={spot.image}
                className="h-24 w-24 object-cover rounded-md rounded-r-none md:hidden lg:block"
                alt={spot.name}
              />
              <div className="text-left m-4">
                <p className="font-bold text-xl">{spot.name}</p>
                <p className="text-gray-700">{spot.description}</p>
              </div>

              {user?._id === spot.author._id && (
                <>
                  <ButtonCustom
                    className="absolute top-1 right-1"
                    type="removal"
                    onClick={() => props.onDelete(spot._id)}
                  >
                    <ImBin />
                  </ButtonCustom>
                  <ButtonCustom
                    className="absolute top-10 right-1"
                    type="edit"
                    onClick={() => props.onEdit(spot._id)}
                  >
                    <BiEditAlt />
                  </ButtonCustom>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBar;
