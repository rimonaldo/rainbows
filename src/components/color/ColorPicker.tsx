import { HexColorPicker } from 'react-colorful'
type ColorPickerProps = {
   handleColorChange: (hex: string) => void
   hex: string
}

const ColorPicker: React.FC<ColorPickerProps> = ({ handleColorChange, hex }) => {
   return (
      <>
         <div className="color-picker-container">
            <HexColorPicker color={hex} onChange={handleColorChange} style={{ minWidth: '100%' }} />
         </div>
      </>
   )
}

export default ColorPicker
