import React, { ReactElement } from "react";

interface ButtonCustomProps {
  label?: string;
  onClick: (e: never) => void;
  type?: keyof typeof buttonClasses;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const ButtonCustom = (props: ButtonCustomProps): ReactElement => {
  const { label, onClick, type, className } = props;

  return (
    <button
      onClick={onClick}
      className={`${type ? buttonClasses[type] : ""} ${className}`}
      disabled={props.disabled}
    >
      {label} {props.children}
    </button>
  );
};

const buttonClasses = {
  removal:
    "bg-red-500 text-white px-4 py-2 mt-2 rounded transition-all duration-300 hover:bg-red-600 m-1 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:pointer",
  login:
    "bg-blue-500 text-white px-4 py-2 mt-2 rounded transition-all duration-300 hover:bg-blue-600 m-1 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:pointer",
  register:
    "bg-blue-500 text-white px-4 py-2 mt-2 rounded transition-all duration-300 hover:bg-blue-600 m-1 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:pointer",
  add: "bg-green-500 text-white px-4 py-2 mt-2 rounded transition-all duration-300 hover:bg-green-600 m-1 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:pointer",
  edit: "bg-yellow-500 text-white px-4 py-2 mt-2 rounded transition-all duration-300 hover:bg-yellow-600 m-1 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:pointer",
  close:
    "bg-red-500 text-white rounded transition-all duration-300 hover:bg-red-600 m-1 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:pointer",
  default:
    "bg-blue-500 text-white px-4 py-2 mt-2 rounded transition-all duration-300 hover:bg-blue-600 m-1 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:pointer",
};

export default ButtonCustom;
