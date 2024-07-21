import React from "react";
import ConfigIcon from "./ConfigIcon";
import ConfigCmpDescription from "./ConfigCmpDescription";
import ConfigHeader from "./ConfigHeader";
import ConfigInput from "./ConfigInput";
import SelectInput from "./SelectInput";
import Button from "./Button";
const PaletteLayout = () => {
  const [theme, setTheme] = React.useState("light");
  return (
    <section
      id="grid-layout"
      className="grid grid-rows-1 grid-cols-[20vw_1fr] 
      md:grid-cols-[30vw_1fr] xl:grid-cols-[10vw_1fr]
      m-2 gap-2"
    >
      <div
        id="⬅️-container"
        className="flex flex-col auto-cols-min 
        border border-slate-200 rounded-md"
      >
        <h2
          id="⬅️-title"
          className="text-sm font-semibold p-2 border-b border-b-slate-200"
        >
          🎨 Palette generator
        </h2>

        <div id="base-color" className="p-2 border-b ">
          <ConfigHeader label="Base color" />
          <ConfigInput
            type="text"
            placeholder="Type your color"
            value=""
            onChange
          />

          <Button actionLabel="Create palette" theme margin="my-2" />
          <ConfigCmpDescription
            description=" Type a valid color in any format to generate a monochromatic
            palteee. It will range from dark to light with the saturation
            decreasing as it moves away from the base color."
          />
        </div>

        {/* Config */}
        <div id="config" className="">
          <header id="config-title-container" className="flex p-2">
            <ConfigIcon style={"pt-[2.4px] mr-2"} />
            <label id="congig-title" className="text-sm text-slate-500">
              Configuration
            </label>
          </header>

          {/* Config-Scales */}
          <div id="config-scales" className="*:px-2 mb-2">
            <ConfigHeader label={"Scales"} computed={18} />

            <div id="config-scales-input-container">
              <ConfigInput
                placeholder="Type scales amount"
                value={18}
                onChange
              />
            </div>
            <ConfigCmpDescription description="The amount of scales to generate" />
          </div>

          {/* Config-Saturation step */}
          <div id="config-saturation-step" className="*:px-2">
            <ConfigHeader label="Saturation step" computed={0.09} />
            {/* <input id="step-format-select" type="select" />
              <input id="steps-input" type="text" /> */}

            <div
              id="config-saturation-input-container"
              className="flex space-x-2"
            >
              <SelectInput />
              <ConfigInput
                placeholder="input 1"
                value={18}
                onChange={() => {}}
              />
            </div>
            <ConfigCmpDescription description="The minimum amount of saturation allowed. 
            The base color's saturation will be used instead if it's below this value"/>
          </div>

          {/* Config-Min Saturation*/}
          <div id="config-min-saturation">
            <header>
              <label id="min-saturation-label"></label>
              <span id="min-saturation-size"></span>
              <button id="reset"></button>
            </header>

            <div id="min-saturation-input-container">
              <input id="min-saturation-input" type="text" />
            </div>

            <div id="description"></div>
          </div>
        </div>
      </div>

      <div id="🎨-container"></div>
    </section>
  );
};

export default PaletteLayout;
