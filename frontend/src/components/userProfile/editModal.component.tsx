import React, { useEffect, useState } from "react";
import ModalCustom from "../../common/modalCustom/modalCustom.component";
import { User } from "../../providers/currentUser/currentUser.type";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import { IoMdClose } from "react-icons/io";
import {
  ValidationResult,
  validateEditProfile,
} from "../../common/utils/validator.utils";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newUser: User) => void;
  user: User;
}

const EditModalComponent: React.FC<EditModalProps> = (props) => {
  const [profileData, setProfileData] = useState<User>(props.user);
  const [errorsInForm, setErrorsInForm] = useState<string[]>([]);

  useEffect(() => {
    setProfileData(props.user);
  }, [props.user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const result: ValidationResult = validateEditProfile(id, value);
    if (result.isValid) {
      setErrorsInForm([]);
    } else {
      setErrorsInForm(
        result.errors && result.errors.length > 0
          ? result.errors
          : ["Unknown error"]
      );
    }
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("XD");
    props.onConfirm(profileData);
  };

  return (
    <ModalCustom isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex flex-col relative">
        <ButtonCustom
          className="absolute right-0 top-0"
          type="close"
          onClick={props.onClose}
        >
          <IoMdClose />
        </ButtonCustom>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="border-2 border-gray-500 p-2"
          placeholder="Username"
          value={profileData.username}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className="border-2 border-gray-500 p-2"
          placeholder="Description"
          value={profileData.description}
          onChange={handleChange}
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          className="border-2 border-gray-500 p-2"
          placeholder="Location"
          value={profileData.location}
          onChange={handleChange}
        />
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="text"
          name="profilePicture"
          id="profilePicture"
          className="border-2 border-gray-500 p-2"
          placeholder="Profile Picture"
          value={profileData.profilePicture}
          onChange={handleChange}
        />
        <ButtonCustom
          type="add"
          onClick={handleSubmit}
          disabled={errorsInForm.length > 0}
        >
          Save
        </ButtonCustom>
      </div>
    </ModalCustom>
  );
};

export default EditModalComponent;
