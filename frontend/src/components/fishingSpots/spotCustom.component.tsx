import { ReactElement } from "react";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";
import { ImBin } from "react-icons/im";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";

interface SpotCustomProps {
  spot: FishingSpot;
  onDelete: (id: string) => void;
}

const SpotCustom: React.FC<SpotCustomProps> = (
  props: SpotCustomProps
): ReactElement => {
  const { spot } = props;
  return (
    <div className="flex bg-white shadow-md rounded-md mb-4 hover:shadow-lg transition duration-300 ease-in-out relative">
      <img
        src={spot.image}
        className="h-24 object-cover rounded-md rounded-r-none md:hidden lg:block"
        alt={spot.name}
      />
      <div className="text-left m-4">
        <p className="font-bold text-xl">{spot.name}</p>
        <p className="text-gray-700">{spot.description}</p>
      </div>

      <ButtonCustom
        className="absolute top-1 right-1"
        type="removal"
        onClick={() => props.onDelete(spot._id)}
      >
        <ImBin />
      </ButtonCustom>
      <ButtonCustom
        className="absolute top-10 right-1"
        type="login"
        onClick={() => props.onDelete(spot._id)}
      >
        <ImBin />
      </ButtonCustom>
    </div>
  );
};

export default SpotCustom;
