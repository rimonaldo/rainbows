import React, { useEffect, useState } from "react";
import { useScrollPosition } from "./hooks/useScrollPosition";
import Hero from "./layouts/Hero";
import { usePaletteContext } from "./hooks/usePaletteContext";
import NavBar from "./layouts/NavBar";
import Models from "./layouts/Models";
import { usePaletteStore } from "./store/usePaletteStore";
// import PaletteLayout from './layouts/pallete/PaletteLayout.jsx'

function App() {
  const { palette } = usePaletteContext();
  const prevScrollPos = useScrollPosition();
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const { addPalette } = usePaletteStore();
  useEffect(() => {
    setIsScrolledDown(prevScrollPos > 270);
  }, [prevScrollPos]);

  return (
    <div
      className="App main-layout"
      style={{ background: palette.primary.shade[100].hex }}
    >
      <NavBar />
      <Hero scrollPosition={prevScrollPos} />
      <Models />
    </div>
  );
}
export default App;
