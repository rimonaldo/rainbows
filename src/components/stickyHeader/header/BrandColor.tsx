import React, { useState, useEffect } from 'react'
import './style/brand-colors.scss'
import { usePaletteContext } from '../../../hooks/usePaletteContext'
import { PaletteColorType } from '../../../services/palette'

type Props = {
   // paletteColor.shade[500].hex: string
   // paletteColor.role: string
   onColorChange: (ev: React.ChangeEvent<HTMLInputElement>, role: string) => void
   paletteColor: PaletteColorType
}

const BrandColor = ({ paletteColor, onColorChange }: Props) => {
   const [copied, setCopied] = useState(false)
   const [copiedColor, setCopiedColor] = useState('#ffffff')
   const [isLocked, setIsLocked] = useState(false)
   // const { editPaletteColor } = usePaletteContext()

   useEffect(() => {
      if (paletteColor.role === 'primary') {
         setIsLocked(true)
      }
   }, [])

   // const handleColorChange = (ev: React.ChangeEvent<HTMLInputElement>, role: string) => {
   //    editPaletteColor(role, ev.target.value)
   //    const newHex = ev.target.value
   //    console.log(newHex)
   // }

   // set timeout to reset copied state

   const hexToRgb = (hex: string) => {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
         ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
           }
         : null
   }

   const contrastColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
      var yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? '#000000' : '#ffffff'
   }

   const copyToClipboard = (str: string) => {
      const el = document.createElement('textarea')
      el.value = str
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
   }

   const handleCopyToClipboard = () => {
      const newCopiedColor = textColor === '#ffffff' ? paletteColor.shade[500].hex : '#000000'
      setCopiedColor(newCopiedColor)
      copyToClipboard(paletteColor.shade[500].hex)
      setCopied(true)
      setTimeout(() => {
         setCopied(false)
      }, 900)
   }
   const textColor = contrastColor(hexToRgb(paletteColor.shade[500].hex) as { r: number; g: number; b: number })

   return (
      <div className="brand-color">
         <div className="locked">
            <span>{isLocked ? '🔒' : ''}</span>
         </div>
         <span className={copied ? 'copied hex' : 'hex'} style={copied ? { color: copiedColor } : { color: textColor }}>
            {copied ? 'Copied!' : paletteColor.shade[500].hex}
         </span>
         <div className="role">{paletteColor.role}</div>
         <div className="bg-wrapper">
            <div className="fill" style={{ background: paletteColor.shade[500].hex }}></div>
            <div className="space"></div>
         </div>
         <div className="actions">
            <button className="copy" onClick={handleCopyToClipboard}>
               #
            </button>
            <button className="lock" onClick={() => setIsLocked(!isLocked)}>
               🔒
            </button>
            <button className="change" style={{ background: textColor }}>
               <div className="circle" style={{ background: paletteColor.shade[500].hex }}></div>
               <input
                  onChange={ev => onColorChange(ev, paletteColor.role)}
                  type="color"
                  value={paletteColor.shade[500].hex}
               />
            </button>
         </div>
      </div>
   )
}

export default BrandColor
