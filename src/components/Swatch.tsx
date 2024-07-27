import React, { useEffect, useState } from "react";
import {
  PaletteColorRole,
  PaletteColorStyle,
  PaletteColorType,
  CustomStyleType,
  hex,
  ColorStyleType,
  hsl,
} from "../types";
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
import useDebounce from "../hooks/useDebounce";
import { usePaletteStore } from "../store/usePaletteStore";
import { add } from "lodash";
import useCustomStyle from "../hooks/useCustomStyle";
import CustomStyleForm from "./CustomStyleForm";

type Props = {
  color: PaletteColorType;
  onLock: (role: PaletteColorRole, newLockState: boolean) => void;
  onColorChange: (role: PaletteColorRole, hex: hex) => void;
  onStyleChange: (role: PaletteColorRole, style: ColorStyleType) => void;
};

const Swatch: React.FC<Props> = React.memo(
  ({ color, onLock, onColorChange, onStyleChange: handleStyleChange }) => {
    const [colorHex, setColorHex] = useState(color.hex);
    const debouncedHex = useDebounce(colorHex, 200);
    const [isStyleOptionsOpen, setIsStyleOptionsOpen] = useState(false);
    const [styleName, setStyleName] = useState(color.style);
    const [customStyles, setCustomStyles] = useState<string[]>([]);
    const [isChanged, setIsChanged] = useState(false);

    const handleLock = () => {
      onLock(color.role, !color.isLocked);
    };

    const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      setColorHex(ev.target.value);
    };

    useEffect(() => {
      onColorChange(color.role, debouncedHex);
    }, [debouncedHex]);

    useEffect(() => {
      setCustomStyles(Object.keys(color.customStyles));
    }, [color.customStyles, isChanged]);

    const onStyleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      if (ev.target.value === "addRule") {
        setIsStyleOptionsOpen(true);
        return;
      }
      setIsStyleOptionsOpen(false);

      const newCustomStyle =
        color.customStyles[ev.target.value as PaletteColorStyle];
      handleStyleChange(color.role, newCustomStyle);
    };

    const handleStyleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      setStyleName(ev.target.value as PaletteColorStyle);
    };

    const handleClose = () => {
      setIsStyleOptionsOpen(false);
    };

    const isBrightHSL = (hsl: hsl) => {
      return hsl.l > 0.5;
    };

    return (
      <li className="swatch flex flex-col  h-full  hover:border-b hover:border-red-300 ">
        <div
          className="color relative flex-3 w-full"
          style={{ background: color.shade[500].hex }}
        >
          <div
            className={`lock absolute top-[-0.5em] ${
              color.isLocked ? "opacity-100" : "opacity-30 hover:opacity-70"
            } cursor-pointer text-lg z-20`}
            style={{
              color: isBrightHSL(color.color.hsl) ? "black" : "white",
              background: color.shade[500].hex,
              borderRadius: "30%",
            }}
            onMouseUp={handleLock}
          >
            {color.isLocked ? <CiLock /> : <CiUnlock />}
          </div>
          <input
            className="w-full h-full cursor-pointer opacity-0 z-10"
            value={color.hex}
            type="color"
            onChange={handleColorChange}
          />
        </div>
        <div className="bottom-line flex justify-around items-center flex-1 text-sm transition duration-200">
          <select
            className="text-xs"
            onChange={onStyleChange}
            value={color.style}
            name="selectStyle"
          >
            <option value="random">random</option>
            {customStyles.map((styleName) => (
              <option key={styleName} value={styleName}>
                {styleName}
              </option>
            ))}
          </select>
          <div className="actions flex justify-around items-center w-[35%]">
            <div
              className={`lock ${
                color.isLocked ? "opacity-100" : "opacity-30 hover:opacity-70"
              } cursor-pointer text-lg`}
              onMouseUp={handleLock}
            >
              {color.isLocked ? <CiLock /> : <CiUnlock />}
            </div>
          </div>
        </div>
      </li>
    );
  }
);

export default Swatch;
