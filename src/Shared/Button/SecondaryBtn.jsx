import React from "react";

const SecondaryBtn = ({
  img,
  label,
  onClick,
  type = "button",
  className = "",
  disabled,
}) => {
  const baseClass = `btn border border-lime-400 rounded-lg bg-transparent shadow-none px-6 py-3 font-league font-bold uppercase z-10 relative overflow-hidden group `;

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClass} ${className}`}
      >
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-4 bg-lime-200"></div>
        </div>
        {img} {label}
      </button>
      
    </div>
  );
};

export default SecondaryBtn;
