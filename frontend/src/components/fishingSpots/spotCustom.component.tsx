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
    <div className="flex bg-white shadow-md p-6 rounded-md mb-4 hover:shadow-lg transition duration-300 ease-in-out relative">
      <img
        src={spot.image}
        className="h-16 w-16 object-cover ml-4"
        alt={spot.name}
      />
      <div>
        <h2 className="font-bold text-xl mb-4">{spot.name}</h2>
        <p className="text-gray-700">{spot.description}</p>
      </div>

      <ButtonCustom
        className="absolute top-1 right-1"
        type="removal"
        onClick={() => props.onDelete(spot._id)}
      >
        <ImBin />
      </ButtonCustom>
    </div>
  );
};

export default SpotCustom;
