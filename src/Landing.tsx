import React from 'react'
import { usePaletteContext } from './hooks/usePaletteContext'
import { PaletteColorType } from './services/palette'
const LandingPage: React.FC = () => {
   const { palette } = usePaletteContext()

   const gradient = (color: PaletteColorType,shade:number = 500) => {
      return `linear-gradient(120deg, ${color.shade[shade].hex} 0%, rgba(255,255,255,1) 100%)`
   }

   const color = (color: PaletteColorType, shade: number) => {
      return color.shade[shade].hex
   }

   //    const gradient = `linear-gradient(90deg, ${palette.primary.shade[500].hex} 0%, rgba(0,212,255,1) 100%)`
   return (
      <div>
         {/* Hero Section */}
         <section style={{ background: gradient(palette.primary), color: 'white', padding: '3rem' }}>
            <h1>Welcome to the Color Palette Generator</h1>
            <p>Choose from our curated color palettes to make your designs stand out</p>
         </section>

         {/* Card Section */}
         <section style={{ display: 'flex', justifyContent: 'space-between', padding: '3rem' }}>
            <div
               style={{
                  background: color(palette.secondary,500),
                  width: '30%',
                  height: '20rem',
                  padding: '1.5rem',
               }}
            >
               <h2>Secondary Colors</h2>
               <p>Use our secondary color palette to add a pop of color to your designs</p>
            </div>
            <div
               style={{
                  backgroundColor: color(palette.neutral, 500),
                  width: '30%',
                  height: '20rem',
                  padding: '1.5rem',
               }}
            >
               <h2>Neutral Colors</h2>
               <p>Choose from our neutral color palette for a calm and sophisticated look</p>
            </div>
            <div
               style={{
                  backgroundColor: palette.info.shade[500].hex,
                  width: '30%',
                  height: '20rem',
                  padding: '1.5rem',
               }}
            >
               <h2>Info Colors</h2>
               <p>Use our info color palette to highlight important information on your designs</p>
            </div>
         </section>

         {/* Form Section */}
         <section style={{ padding: '3rem' }}>
            <h2>Choose your Semantic Colors</h2>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <label style={{ color: palette.danger.shade[500].hex }}>
                  Danger Color:
                  <input type="radio" name="semantic-color" value="danger" />
               </label>
               <label style={{ color: palette.warning.shade[500].hex }}>
                  Warning Color:
                  <input type="radio" name="semantic-color" value="warning" />
               </label>
               <label style={{ color: palette.success.shade[500].hex }}>
                  Success Color:
                  <input type="radio" name="semantic-color" value="success" />
               </label>
               <label style={{ color: palette.info.shade[500].hex }}>
                  Info Color:
                  <input type="radio" name="semantic-color" value="info" />
               </label>
            </form>
         </section>
      </div>
   )
}

export default LandingPage
