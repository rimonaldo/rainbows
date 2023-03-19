import React, { useEffect, useState } from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import BrandColor from './BrandColor'
import { Color } from '../services/color'
import { useSassContext } from '../hooks/useSassContext'
import { PaletteMetaDataType } from '../services/palette'

type Props = {
   isSticky: boolean
}

function Header({ isSticky }: Props) {
   const [stickyNav, setStickyNav] = useState(false)

   const handleScroll = () => {
      window.pageYOffset >= 100 ? setStickyNav(true) : setStickyNav(false)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => window.addEventListener('scroll', handleScroll)
   })
   // sticky

   const { palette, editPaletteColor, getHslByPaletteStyle, setPrimary, setMetaData, setPalette } = usePaletteContext()
   const { setSassVariable } = useSassContext()
   const [paletteStyle, setColorStyle] = React.useState('pastel')
   type themeType = 'light' | 'dark'
   const [usedTheme, setUsedTheme] = React.useState<themeType>('light')

   const textColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
      var yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? 'black' : 'white'
   }

   const onColorChange = (ev: React.ChangeEvent<HTMLInputElement>, role: string) => {
      editPaletteColor(role, ev.target.value)
   }

   const handleOptionsChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      let newPrimaryHsl = getHslByPaletteStyle(ev.target.value)
      setColorStyle(ev.target.value)
      const primaryColor = new Color({ hsl: newPrimaryHsl })
   }

   const handleThemeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      let theme = 'light' as 'light' | 'dark'
      if (ev.target.value === 'dark') {
         theme = 'dark' as 'dark'
      }
      let newMetaData = { ...palette.metaData, theme: ev.target.value } as PaletteMetaDataType
      // setMetaData(newMetaData)
      setUsedTheme(theme)
   }

   const generatePalette = () => {
      let primaryHsl = getHslByPaletteStyle(paletteStyle)
      // setPalette({ ...palette, primary: { ...palette.primary } })
      setPrimary(new Color({ hsl: primaryHsl }), usedTheme)
      let textColor = usedTheme === 'light' ? 'white' : 'white'
      setSassVariable('--ContrastText', textColor)
   }

   useEffect(() => {
      const contrastText = textColor(palette.neutral.shade[500].rgb)
      setSassVariable('--ContrastText', contrastText)
   }, [palette.neutral])

   return (
      <div className={'header'}>
         <div className="logo">Rainbows</div>

         <div className="brand-colors-wrapper ">
            <BrandColor paletteColor={palette.primary} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.secondary} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.tertiary} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.neutral} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.info} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.success} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.warning} onColorChange={onColorChange} />
            <BrandColor paletteColor={palette.danger} onColorChange={onColorChange} />
         </div>

         <div className="options-wrapper">
            <button onClick={generatePalette}>generate</button>
            <div className="options-wrapper">
               <select name="" id="" onChange={handleOptionsChange}>
                  <option value="pastel">Pastel</option>
                  <option value="jewel">Jewl</option>
                  <option value="neon">Neon</option>
                  <option value="earth">Earth</option>
               </select>
            </div>
            <div className="options-wrapper">
               <select name="" id="" onChange={handleThemeChange}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
               </select>
            </div>
         </div>
      </div>
   )
}

export default Header
