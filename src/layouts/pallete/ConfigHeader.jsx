import React from "react";
import ResetIcon from "./ResetIcon";

const ConfigHeader = ({ label, computed, onReset }) => {
  return (
    <header className="flex justify-between">
      <div className="">
        <label id="label" className="text-sm font-semibold">
          {label} {computed ? ": "  : ""}
        </label>
        <span id="computed" className="text-slate-500 text-sm">
          {computed}
        </span>
      </div>
      <button id="reset" className="" onClick={() => onReset()}>
        <ResetIcon style="" />
      </button>
    </header>
  );
};

export default ConfigHeader;
