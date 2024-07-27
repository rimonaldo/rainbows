import React, { useEffect, useState } from "react";
import { PaletteType } from "../types";
import Waves from "../components/Waves";
import { usePaletteStore } from "../store/usePaletteStore";
import { usePrevious } from "../hooks/usePrev";
import { Palette } from "../services/Palette.service";
import { setSassPalette } from "../hooks/useSass";
import useDebounce from "../hooks/useDebounce";
import RetroButton from "./Button";
type Props = {};

function Hero({}: Props) {
  const { generatePalette, palette, setPalette } = usePaletteStore();
  const [prevPalette, setPrevPalette] = useState<PaletteType>(palette);
  const [tempValue, setTempVal]: [
    1 | 2 | 3,
    React.Dispatch<React.SetStateAction<1 | 2 | 3>>
  ] = useState<1 | 2 | 3>(1);
  const [fluidity, setFluidityVal]: [
    1 | 2 | 3,
    React.Dispatch<React.SetStateAction<1 | 2 | 3>>
  ] = useState<1 | 2 | 3>(3);
  const [num, incNum] = useState(0);
  const debouncedNum = useDebounce(num, 700);

  const handleGenerate = () => {
    generatePalette(tempValue, fluidity, palette);
    incNum(num + 1);
  };

  useEffect(() => {
    setSassPalette(palette.getMiniPalette());
  }, [debouncedNum]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Check if 'Ctrl' (or 'Cmd' for MacOS) and 'Z' keys are pressed together
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        // Prevent default browser behavior (like browser undo)
        event.preventDefault();
        // Set the count to its previous value
        if (palette !== undefined) {
          setPalette(new Palette(prevPalette));
        }
      }
    }

    // Attach the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup by removing the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const textColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  };

  const randNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min) as 1 | 2 | 3;
  };

  return (
    <section className="bg-red-500 ">
      <div className="relative min-h-[40vh]  w-[90vw] max-w-[1600px] m-auto z-0">
        <header className=" bg-red-100">
          <h1
            className="mb-4"
            style={{
              color: palette.primary.shade[500].hex,
              fontFamily: "Vintage",
            }}
          >
            Generate a Rainb
            <span style={{ color: palette.secondary.shade[600].hex }}>
              o
            </span>w <br /> of Possibilities
          </h1>

          <RetroButton
            label="Generate"
            onClick={handleGenerate}
            palette={palette}
          />
        </header>

        <div className="img"></div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: 0,
            width: "100%",
            zIndex: "1",
          }}
        >
          <Waves />
        </div>
      </div>
    </section>
  );
}

export default Hero;
