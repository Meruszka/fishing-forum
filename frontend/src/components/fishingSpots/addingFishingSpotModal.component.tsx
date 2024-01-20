import { ReactElement, useEffect, useState } from "react";
import ModalCustom from "../../common/modalCustom/modalCustom.component";
import { IoMdClose } from "react-icons/io";
import { FishingSpotDTO } from "./fishingSpots.service";
import {
  ValidationResult,
  validateAddingSpot,
} from "../../common/utils/validator.utils";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";

interface AddingFishingSpotModalProps {
  isOpen_Type: ModalOpenType;
  onClose: () => void;
  onConfirm: (newFishingspot: FishingSpotDTO) => void;
  initialSpot: FishingSpotDTO;
}

export interface ModalOpenType {
  isOpen: boolean;
  type: "add" | "edit";
}

const AddingFishingSpotModal: React.FC<AddingFishingSpotModalProps> = (
  props: AddingFishingSpotModalProps
): ReactElement => {
  const { isOpen_Type, onClose, onConfirm, initialSpot } = props;
  const [errosInForm, setErrorsInForm] = useState<string[]>([]);
  const [newFishingspot, setNewFishingspot] = useState<FishingSpotDTO>(
    {} as FishingSpotDTO
  );

  useEffect(() => {
    setNewFishingspot(initialSpot);
  }, [initialSpot]);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    const result: ValidationResult = validateAddingSpot(id, value);
    if (result.isValid) {
      setErrorsInForm([]);
    } else {
      setErrorsInForm(
        result.errors && result.errors.length > 0
          ? result.errors
          : ["Unknown error"]
      );
    }
    setNewFishingspot((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    onConfirm(newFishingspot);
    setNewFishingspot({} as FishingSpotDTO);
  };

  return (
    <ModalCustom isOpen={isOpen_Type.isOpen} onClose={onClose}>
      <div className="flex flex-col relative">
        <ButtonCustom
          className="absolute right-0 top-0"
          type="close"
          onClick={onClose}
        >
          <IoMdClose />
        </ButtonCustom>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="border-2 border-gray-500 p-2"
          placeholder="Name of the spot"
          value={newFishingspot.name}
          onChange={handleFormChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          className="border-2 border-gray-500 p-2"
          placeholder="Description of the spot"
          value={newFishingspot.description}
          onChange={handleFormChange}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          max={5}
          min={1}
          className="border-2 border-gray-500 p-2"
          placeholder="Rating of the spot"
          value={newFishingspot.rating}
          onChange={handleFormChange}
        />
        <label htmlFor="type">Type</label>
        <select
          id="type"
          onChange={handleFormChange}
          className="border-2 border-gray-500 p-2"
        >
          <option value="River">River</option>
          <option value="Lake">Lake</option>
          <option value="Pond">Pond</option>
          <option value="Sea">Sea</option>
          <option value="Ocean">Ocean</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          className="border-2 border-gray-500 p-2"
          placeholder="Image (URL) of the spot"
          value={newFishingspot.image}
          onChange={handleFormChange}
        />
        <div>
          {errosInForm.map((error) => (
            <div className="text-red-500">{error}</div>
          ))}
        </div>
        <ButtonCustom
          onClick={handleSubmit}
          type="add"
          disabled={errosInForm.length > 0}
        >
          {isOpen_Type.type?.charAt(0).toUpperCase() +
            isOpen_Type.type?.slice(1)}
        </ButtonCustom>
      </div>
    </ModalCustom>
  );
};

export default AddingFishingSpotModal;
