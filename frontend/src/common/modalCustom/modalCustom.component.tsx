import React, { ReactNode, useEffect, useRef } from "react";

type ModalCustomProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalCustom: React.FC<ModalCustomProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-20"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4 shadow-lg" ref={modalRef}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalCustom;
