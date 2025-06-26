import React from "react";

const PrimaryBtn = ({
  img,
  label,
  onClick,
  type = "button",
  className = "",
  disabled,
}) => {
  const baseClass = `btn font-league font-bold uppercase px-6 py-3 bg-lime-400  border-none shadow-none rounded-lg relative overflow-hidden group z-10`;

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClass} ${className}`}
      >
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
        {img} {label}
      </button>
      
    </div>
  );
};

export default PrimaryBtn;
