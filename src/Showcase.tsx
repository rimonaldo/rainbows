import React, { useEffect } from 'react'
import './showcase.scss'
import { usePaletteContext } from './hooks/usePaletteContext'
import { useColorContext } from './hooks/useColorContext'
import { Color } from './services/color'
import { PaletteColorType } from './services/palette/PaletteType'
import Waves from './Waves'
import SwatchList from './components/SwatchList'
import { PaletteColorRole } from './services/palette/PaletteType'
type Props = {
   scrollPosition: number
}

function Showcase({ scrollPosition }: Props) {
   const { palette, setPrimary, generatePaletteByStyle, generatePaletteColorByStyle } = usePaletteContext()
   const { color, setColor } = useColorContext()
   const [colorStyle, setColorStyle] = React.useState<'neon' | 'pastel' | 'earth' | 'jewel'>('pastel')
   const setSassVariable = (variable: string, value: string) => {
      const root = document.documentElement
      root.style.setProperty(variable, value)
   }

   const [isSwatchListSticky, setIsSwatchListSticky] = React.useState<boolean>(false)
   // generate random color

   const handleGenerate = () => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
      // setPrimary(new Color({ hex: randomColor }))
      const paletteColors = [
         palette.primary,
         palette.secondary,
         palette.neutral,
         palette.warning,
         palette.danger,
         palette.success,
         palette.info,
      ]
      const unlockedColors = paletteColors.filter((color: PaletteColorType) => !color.isLocked)
      unlockedColors.forEach(color => {
         generatePaletteColorByStyle(colorStyle, color.role as PaletteColorRole)
         console.log(color.role)
      })
      generatePaletteByStyle(colorStyle)
      // setPrimary(new Color({ hex: randomColor }), )
   }

   useEffect(() => {
      setSassVariable('--primary500', palette.primary.shade[500].hex)
      setSassVariable('--primary100', palette.primary.shade[100].hex)
      setSassVariable('--primary200', palette.primary.shade[200].hex)
      setSassVariable('--primary300', palette.primary.shade[300].hex)
      setSassVariable('--primary400', palette.primary.shade[400].hex)
      setSassVariable('--primary600', palette.primary.shade[600].hex)
      setSassVariable('--primary700', palette.primary.shade[700].hex)
      setSassVariable('--primary800', palette.primary.shade[800].hex)
      setSassVariable('--primary900', palette.primary.shade[900].hex)
      setSassVariable('--secondary100', palette.secondary.shade[100].hex)
      setSassVariable('--secondary200', palette.secondary.shade[200].hex)
      setSassVariable('--secondary300', palette.secondary.shade[300].hex)
      setSassVariable('--secondary400', palette.secondary.shade[400].hex)
      setSassVariable('--secondary500', palette.secondary.shade[500].hex)
      setSassVariable('--secondary600', palette.secondary.shade[600].hex)
      setSassVariable('--secondary700', palette.secondary.shade[700].hex)
      setSassVariable('--secondary800', palette.secondary.shade[800].hex)
      setSassVariable('--secondary900', palette.secondary.shade[900].hex)

      setSassVariable('--neutral100', palette.neutral.shade[100].hex)
      setSassVariable('--neutral200', palette.neutral.shade[200].hex)
      setSassVariable('--neutral300', palette.neutral.shade[300].hex)
      setSassVariable('--neutral400', palette.neutral.shade[400].hex)
      setSassVariable('--neutral500', palette.neutral.shade[500].hex)
      setSassVariable('--neutral600', palette.neutral.shade[600].hex)
      setSassVariable('--neutral700', palette.neutral.shade[700].hex)
      setSassVariable('--neutral800', palette.neutral.shade[800].hex)
      setSassVariable('--neutral900', palette.neutral.shade[900].hex)
   }, [palette])

   const getShadeHex = (color: PaletteColorType, shade: number) => {
      return color.shade[shade].hex
   }

   const textColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
      var yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? 'black' : 'white'
   }

   return (
      <section
         className="showcase-container "
         // style={{ position: 'relative', background: getShadeHex(palette.neutral, 500) }}
         style={{ position: 'relative' }}
      >
         <div className="scroll " style={{position:'sticky', top:'2rem', left:'2rem', color:'black'}}>{scrollPosition}</div>
         <div className="hero">
            <header>
               <div className="h-container  ">
                  <h1 style={{ color: palette.primary.shade[500].hex }}>
                     Generate a Rainb<span style={{ color: palette.secondary.shade[600].hex }}>o</span>w <br /> of
                     Possibilities
                  </h1>
                  {/* <div className="sub"> Add a Splash of Color to Your Life and Ignite Your Imagination</div> */}
               </div>
               {/* <p className=''>
                  see how the colors in our palette can be used in design elements to create a cohesive and visually
                  appealing design.
               </p> */}
               <div className="flex">
                  <div className="btn btn-primary " onClick={handleGenerate}>
                     Generate
                  </div>
                  <select onChange={ev => setColorStyle(ev.target.value as 'neon' | 'pastel' | 'earth' | 'jewel')}>
                     <option value="pastel">Pastel</option>
                     <option value="jewel">Jewel</option>
                     <option value="earth">Earthy</option>
                     <option value="neon">Neon</option>
                  </select>
               </div>
            </header>
            <div className="img">
               {/* <img src="./rocket.svg" alt="" style={{ width: '100%', height: '100%' }} /> */}
            </div>
         </div>
         <SwatchList ></SwatchList>
         <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%' }}>{/* <Waves /> */}</div>
      </section>
   )
}

export default Showcase

/* 
<section className="mb-40">
         <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
               <div className="flex items-center">
                  <button
                     className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
                     type="button"
                     data-bs-toggle="collapse"
                     data-bs-target="#navbarSupportedContentY"
                     aria-controls="navbarSupportedContentY"
                     aria-expanded="false"
                     aria-label="Toggle navigation"
                  >
                     <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        className="w-5"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                     >
                        <path
                           fill="currentColor"
                           d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                        ></path>
                     </svg>
                  </button>
                  <a className="navbar-brand text-blue-600" href="#!">
                     <svg
                        className="w-5 h-5 ml-2 lg:ml-0 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                     >
                        <path
                           fill="currentColor"
                           d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"
                        ></path>
                     </svg>
                  </a>
               </div>
               <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
                  <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                     <li className="nav-item">
                        <a
                           className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                           href="#!"
                           data-mdb-ripple="true"
                           data-mdb-ripple-color="light"
                        >
                           Dashboard
                        </a>
                     </li>
                     <li className="nav-item">
                        <a
                           className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                           href="#!"
                           data-mdb-ripple="true"
                           data-mdb-ripple-color="light"
                        >
                           Team
                        </a>
                     </li>
                     <li className="nav-item mb-2 lg:mb-0">
                        <a
                           className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                           href="#!"
                           data-mdb-ripple="true"
                           data-mdb-ripple-color="light"
                        >
                           Projects
                        </a>
                     </li>
                  </ul>
               </div>
               <div className="flex items-center lg:ml-auto">
                  <button
                     type="button"
                     className="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                     data-mdb-ripple="true"
                     data-mdb-ripple-color="light"
                  >
                     Login
                  </button>
                  <button
                     type="button"
                     className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                     data-mdb-ripple="true"
                     data-mdb-ripple-color="light"
                  >
                     Sign up for free
                  </button>
               </div>
            </div>
         </nav>

         <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="absolute block w-full"
            style={{ margin: 'auto; z-index: -10;' }}
            height="680"
            preserveAspectRatio="none"
            viewBox="0 0 1920 880"
         >
            <g transform="translate(960,440) scale(1,1) translate(-960,-440)">
               <linearGradient id="lg-0.047955344060927496" x1="0" x2="1" y1="0" y2="0">
                  <stop stop-color="hsl(217, 88%, 33.7%)" offset="0"></stop>
                  <stop stop-color="hsl(217, 88%, 75.1%)" offset="1"></stop>
               </linearGradient>
               <path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
                  <animate
                     attributeName="d"
                     dur="33.333333333333336s"
                     repeatCount="indefinite"
                     keyTimes="0;0.333;0.667;1"
                     calcMode={'spline'}
                     keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
                     begin="0s"
                     values="M0 0L 0 804.2328934685746Q 320 597.3613372284876  640 571.0708916590191T 1280 512.0661063245175T 1920 301.8788007488083L 1920 0 Z;M0 0L 0 877.6839081951588Q 320 668.0720922803877  640 649.0018928349388T 1280 328.7087077664202T 1920 162.95038242563396L 1920 0 Z;M0 0L 0 724.9886210051687Q 320 661.4364572061575  640 623.2173947479624T 1280 359.20353038907734T 1920 135.51673041732283L 1920 0 Z;M0 0L 0 804.2328934685746Q 320 597.3613372284876  640 571.0708916590191T 1280 512.0661063245175T 1920 301.8788007488083L 1920 0 Z"
                  ></animate>
               </path>
               <path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
                  <animate
                     attributeName="d"
                     dur="33.333333333333336s"
                     repeatCount="indefinite"
                     keyTimes="0;0.333;0.667;1"
                     calcMode={'spline'}
                     keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
                     begin="-6.666666666666667s"
                     values="M0 0L 0 765.7607191473613Q 320 641.7853945676919  640 624.2534689988059T 1280 365.27264408032966T 1920 190.38947978522663L 1920 0 Z;M0 0L 0 842.1984196370487Q 320 570.6690721707517  640 540.6844954979398T 1280 439.92879442880593T 1920 200.29713960445451L 1920 0 Z;M0 0L 0 796.6802345094818Q 320 721.9216894353016  640 696.8815669355181T 1280 373.6367381440213T 1920 196.63169821789495L 1920 0 Z;M0 0L 0 765.7607191473613Q 320 641.7853945676919  640 624.2534689988059T 1280 365.27264408032966T 1920 190.38947978522663L 1920 0 Z"
                  ></animate>
               </path>
               <path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
                  <animate
                     attributeName="d"
                     dur="33.333333333333336s"
                     repeatCount="indefinite"
                     keyTimes="0;0.333;0.667;1"
                     calcMode={'spline'}
                     keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
                     begin="-13.333333333333334s"
                     values="M0 0L 0 801.7562714943509Q 320 634.0247183381232  640 605.7090791951217T 1280 503.9393370140325T 1920 224.7551247480177L 1920 0 Z;M0 0L 0 821.0401780336218Q 320 670.8690783540507  640 637.0744123031742T 1280 456.40745286432224T 1920 278.1294357804296L 1920 0 Z;M0 0L 0 744.0534225112256Q 320 637.6425395409125  640 593.2079605185819T 1280 457.03995196824286T 1920 254.87693899994804L 1920 0 Z;M0 0L 0 801.7562714943509Q 320 634.0247183381232  640 605.7090791951217T 1280 503.9393370140325T 1920 224.7551247480177L 1920 0 Z"
                  ></animate>
               </path>
               <path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
                  <animate
                     attributeName="d"
                     dur="33.333333333333336s"
                     repeatCount="indefinite"
                     keyTimes="0;0.333;0.667;1"
                     calcMode={'spline'}
                     keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
                     begin="-20s"
                     values="M0 0L 0 817.8603658675457Q 320 592.9404308081629  640 559.1126621853513T 1280 428.9912604821798T 1920 209.017381620229L 1920 0 Z;M0 0L 0 802.0504889976935Q 320 561.3963273210122  640 537.6024084387631T 1280 430.41283267566695T 1920 256.1972069733954L 1920 0 Z;M0 0L 0 789.4448177495887Q 320 561.9675446430498  640 531.6192318019404T 1280 414.76018143244175T 1920 265.9163329632971L 1920 0 Z;M0 0L 0 817.8603658675457Q 320 592.9404308081629  640 559.1126621853513T 1280 428.9912604821798T 1920 209.017381620229L 1920 0 Z"
                  ></animate>
               </path>
               <path d="" fill="url(#lg-0.047955344060927496)" opacity="0.4">
                  <animate
                     attributeName="d"
                     dur="33.333333333333336s"
                     repeatCount="indefinite"
                     keyTimes="0;0.333;0.667;1"
                     calcMode={'spline'}
                     keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
                     begin="-26.666666666666668s"
                     values="M0 0L 0 844.0541574423102Q 320 623.0697081316591  640 592.8483890737847T 1280 469.85448734523794T 1920 190.81850676853674L 1920 0 Z;M0 0L 0 871.4928294956283Q 320 618.9784567388518  640 593.1183717103518T 1280 376.5051942642811T 1920 141.32293927545027L 1920 0 Z;M0 0L 0 782.0118384610068Q 320 727.3267836497654  640 694.0476176759635T 1280 518.1545471640493T 1920 276.0053882957168L 1920 0 Z;M0 0L 0 844.0541574423102Q 320 623.0697081316591  640 592.8483890737847T 1280 469.85448734523794T 1920 190.81850676853674L 1920 0 Z"
                  ></animate>
               </path>
            </g>
         </svg>

         <div className="container mx-auto px-6 md:px-12 xl:px-32">
            <div className="text-center text-gray-800">
               <div
                  className="block rounded-lg shadow-lg px-6 py-12 md:py-16 md:px-12"
                  style={{
                     marginTop:
                        '180px; background-color: hsla(0, 0%, 100%, 0.8);backdrop-filter: saturate(200%) blur(25px);',
                  }}
               >
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                     The best offer on the market <br />
                     <span className="text-blue-600">for your business</span>
                  </h1>
                  <a
                     className="inline-block px-7 py-3 mb-2 md:mb-0 mr-0 md:mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                     data-mdb-ripple="true"
                     data-mdb-ripple-color="light"
                     href="#!"
                     role="button"
                  >
                     Get started
                  </a>
                  <a
                     className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                     data-mdb-ripple="true"
                     data-mdb-ripple-color="light"
                     href="#!"
                     role="button"
                  >
                     Learn more
                  </a>
               </div>
            </div>
         </div>
      </section>
      */
