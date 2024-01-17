import { ReactElement } from "react";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";

interface SpotCustomProps {
  spot: FishingSpot;
}

const SpotCustom: React.FC<SpotCustomProps> = (
  props: SpotCustomProps
): ReactElement => {
  const { spot } = props;
  return (
    <div className="flex bg-white shadow-md p-6 rounded-md mb-4 hover:shadow-lg transition duration-300 ease-in-out">
      <div>
        <h2 className="font-bold text-xl mb-4">{spot.name}</h2>
        <p className="text-gray-700">{spot.description}</p>
      </div>
      <img
        src={spot.image}
        className="h-16 w-16 object-cover ml-4"
        alt={spot.name}
      />
    </div>
  );
};

export default SpotCustom;
