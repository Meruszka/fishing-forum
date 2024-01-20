import React from "react";
import { useNavigate } from "react-router-dom";

interface ProfileLinkCustomProps {
  imageUrl: string;
  to: string;
  alt: string;
  className?: string;
  type?: keyof typeof sizeClasses;
}

const ProfileLinkCustom: React.FC<ProfileLinkCustomProps> = ({
  imageUrl,
  to,
  alt,
  className = "",
  type,
}) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(to);
  };
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={handleProfileClick}
    >
      <img
        src={imageUrl}
        alt={alt}
        className={`${type ? sizeClasses[type] : ""} ${className} rounded-full`}
      />
    </div>
  );
};

const sizeClasses = {
  small: "w-8 h-8",
  medium: "w-16 h-16",
  large: "w-24 h-24",
};

export default ProfileLinkCustom;
