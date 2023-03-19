import React, { useEffect } from 'react'
import { usePaletteContext } from '../../hooks/usePaletteContext'
import { ColorType } from '../../services/color/type'
import { useColorContext } from '../../hooks/useColorContext'
import './contact-card.scss'
type Props = {}

export interface PaletteColors {
   brand: ColorType
   darkShade: ColorType
   darkAccent: ColorType
   lightShade: ColorType
   lightAccent: ColorType
}

const ContactCard = () => {
   const { palette } = usePaletteContext()
   const { color } = useColorContext()

   return (
      <div>
         <div className="card-container" style={{background:palette.neutral.shade[500].hex}}>
            <span
               className="pro"
               style={{ background: palette.secondary.shade[100].hex, color: palette.secondary.shade[600].hex }}
            >
               PRO
            </span>
            <img
               style={{ border: `1px ${palette.primary.shade[500].hex} solid` }}
               className="round"
               src="https://randomuser.me/api/portraits/women/79.jpg"
               alt="user"
            />
            <h3 style={{ color: palette.primary.shade[900].hex }}>Ricky Park</h3>
            <h6 style={{ color: palette.neutral.shade[900].hex }}>New York</h6>
            <p style={{ color: palette.neutral.shade[900].hex }}>
               User interface designer and <br /> front-end developer
            </p>
            <div className="buttons">
               <button
                  className="primary"
                  style={{
                     backgroundColor: palette.primary.shade[500].hex,
                     border: `none`,
                     color: palette.secondary.shade[100].hex,
                  }}
               >
                  Message
               </button>
               <button style={{ border: `1px ${palette.primary.shade[100].hex} solid` }} className="primary ghost">
                  Following
               </button>
            </div>
            <div
               className="skills"
               style={{ backgroundColor: palette.primary.shade[100].hex, color: palette.primary.shade[900].hex }}
            >
               <h6>Skills</h6>
               <ul>
                  <li>UI / UX</li>
                  <li>Front End Development</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>Node</li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default ContactCard
