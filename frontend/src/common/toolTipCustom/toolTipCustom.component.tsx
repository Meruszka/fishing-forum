import React, { ReactNode, useState } from "react";

interface ToolTipCustomProps {
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  children: ReactNode;
}

const ToolTipCustom: React.FC<ToolTipCustomProps> = ({
  content,
  position = "top",
  className = "",
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isHovered && (
        <div
          className={`absolute z-10 bg-gray-200 text-gray-800 px-2 py-1 rounded-md shadow-md ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

const positionClasses = {
  top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2",
  bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2",
  left: "top-1/2 right-full transform -translate-y-1/2 -translate-x-2",
  right: "top-1/2 left-full transform -translate-y-1/2 translate-x-2",
};

export default ToolTipCustom;
