import React from "react";

const ConfigInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="border w-full rounded-md p-1 my-1"
      onChange={(ev) => onChange(ev.target.value)}
      size=""
    />
  );
};

export default ConfigInput;
