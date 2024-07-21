import React from "react";

const Button = ({ theme, actionLabel = "", margin }) => {
  return (
    <button
      id="create-palette-btn"
      className={`min-w-full p-1 ${(theme = "light"
        ? "bg-black text-white"
        : "bg-white text-black")} ${margin}  rounded-md`}
    >
      {actionLabel}
    </button>
  );
};

export default Button;
