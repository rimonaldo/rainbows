import React, { FC, MouseEvent, useState } from "react";
import { PaletteType } from "../types";

interface RetroButtonProps {
  label: string;
  onClick: (
    event: MouseEvent<HTMLButtonElement>,
    mousePosition: { x: number; y: number }
  ) => void;
  palette: PaletteType;
}

const RetroButton: FC<RetroButtonProps> = ({ label, onClick, palette }) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [transform, setTransform] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = -rect.left;
    const y = -rect.top;
    setMousePosition({ x, y });
    onClick(event, { x, y });
  };

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>,
    sensitivity: number = 0
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * sensitivity; // Adjust the multiplier for more or less movement
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * sensitivity; // Adjust the multiplier for more or less movement
    setTransform({ x, y });
  };

  return (
    <div
      className="relative w-fit p-2.5 border px-8"
      onMouseMove={(ev) => handleMouseMove(ev, 0)}
      onMouseLeave={() => setTransform({ x: 0, y: 0 })}
    >
      {label}
      <button
        style={{
          background: palette.primary.hex,
          transform: `translate(${transform.x}px, ${transform.y}px)`,
        }}
        onClick={handleClick}
        className="
          absolute w-full h-full right-1 bottom-1 z-10
          bg-red-500 duration-200 ease-in-out border border-slate-500  
          active:bottom-0 active:right-0 rounded-sm
          "
      >
        {label}
      </button>
      <button
        id="button-bottom"
        className="absolute border-2 border-slate-500 w-full h-full left-0 top-0 rounded-sm"
      ></button>
    </div>
  );
};

export default RetroButton;
