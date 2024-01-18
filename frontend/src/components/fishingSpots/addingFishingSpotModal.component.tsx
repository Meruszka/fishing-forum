import { ReactElement, useState } from "react";
import ModalCustom from "../../common/modalCustom/modalCustom.component";
import { IoMdClose } from "react-icons/io";
import { FishingSpotDTO } from "./fishingSpots.service";

interface AddingFishingSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newFishingspot: FishingSpotDTO) => void;
}

const AddingFishingSpotModal: React.FC<AddingFishingSpotModalProps> = (
  props: AddingFishingSpotModalProps
): ReactElement => {
  const { isOpen, onClose, onConfirm } = props;

  const getPlaceholderValues = () => {
    return {
      name: "",
      latitude: 0,
      longitude: 0,
      description: "",
      rating: 0,
      type: "",
      image: "",
    };
  };

  const [newFishingspot, setNewFishingspot] = useState<FishingSpotDTO>(
    getPlaceholderValues()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewFishingspot((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    onConfirm(newFishingspot);
    setNewFishingspot(getPlaceholderValues());
  };

  return (
    <ModalCustom isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col relative">
        <button className="absolute right-1" onClick={onClose}>
          <IoMdClose />
        </button>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="border-2 border-gray-500 p-2"
          placeholder="Name of the spot"
          value={newFishingspot.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          className="border-2 border-gray-500 p-2"
          placeholder="Description of the spot"
          value={newFishingspot.description}
          onChange={handleChange}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          className="border-2 border-gray-500 p-2"
          placeholder="Rating of the spot"
          value={newFishingspot.rating}
          onChange={handleChange}
        />
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          className="border-2 border-gray-500 p-2"
          placeholder="Type of the spot"
          value={newFishingspot.type}
          onChange={handleChange}
        />
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          className="border-2 border-gray-500 p-2"
          placeholder="Image (URL) of the spot"
          value={newFishingspot.image}
          onChange={handleChange}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 mt-2"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </ModalCustom>
  );
};

export default AddingFishingSpotModal;
