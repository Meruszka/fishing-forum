import React, { ReactElement } from "react";

interface ButtonCustomProps {
  label?: string;
  onClick: (e: never) => void;
  color?: string;
  size?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const ButtonCustom = (props: ButtonCustomProps): ReactElement => {
  const { label, onClick, color, size, className } = props;
  const buttonStyles = `bg-${color}-500 text-gray-700 px-4 py-2 rounded ${
    size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-base"
  } hover:bg-${color}-600 focus:outline-none focus:ring focus:border-${color}-700 disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <button
      onClick={onClick}
      className={className ? className : buttonStyles}
      disabled={props.disabled}
    >
      {label} {props.children}
    </button>
  );
};

export default ButtonCustom;
