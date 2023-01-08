import * as React from 'react';

interface ColorInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorInput: React.FunctionComponent<ColorInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="color"
      value={value}
      onChange={onChange}
    //   onFocus
    />
  );
};

export default ColorInput;
