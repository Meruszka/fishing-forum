import { ReactElement } from "react";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";
import { ImBin } from "react-icons/im";

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

      <button
        className="bg-red-500 text-white absolute top-0 right-0 p-2 rounded transition-all duration-300 hover:bg-red-600 m-1"
        onClick={() => props.onDelete(spot._id)}
      >
        <ImBin />
      </button>
    </div>
  );
};

export default SpotCustom;
