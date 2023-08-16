import React from 'react'
import { usePaletteStore } from '../store/usePaletteStore'
type Props = {}

const Waves = (props: Props) => {
   const { palette } = usePaletteStore()
   return (
      <div>
         <style>{css}</style>
         <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
         >
            <defs>
               <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
               <use xlinkHref="#gentle-wave" x="48" y="0" fill={palette.primary.shade[700].hex} />
               <use xlinkHref="#gentle-wave" x="48" y="3" fill={palette.info.shade[800].hex} />
               <use xlinkHref="#gentle-wave" x="48" y="5" fill={palette.secondary.shade[600].hex} />
               <use xlinkHref="#gentle-wave" x="48" y="7" fill={palette.primary.shade[800].hex} />
            </g>
         </svg>
      </div>
   )
}

export default Waves

const css = `
@import url(//fonts.googleapis.com/css?family=Lato:300:400);

body {
  margin:0;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight:300;
  letter-spacing: 2px;
  font-size:48px;
}
p {
  font-family: 'Lato', sans-serif;

}


.logo {
  width:50px;
  fill:white;
  padding-right:15px;
  display:inline-block;
  vertical-align: middle;
}


.waves {
  grid-column: 1 / -1;
  // border: 1px solid red;
  position:relative;
  width: 100%;
  // height:15vh;
  // margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
  opacity:1;
}



/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -10s;
  animation-duration: 30s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}
`
