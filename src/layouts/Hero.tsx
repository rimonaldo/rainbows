import React from 'react'
import { usePaletteContext } from '../hooks/usePaletteContext'
import Waves from '../Waves'
type Props = {}

const Hero = (props: Props) => {
   const { palette } = usePaletteContext()
   return (
      <div className="mb-16">
         <div className="bg-gray-100">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
               <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                     <span className="relative inline-block">
                        <svg
                           viewBox="0 0 52 24"
                           fill="currentColor"
                           className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                        >
                           <defs>
                              <pattern
                                 id="dc223fcc-6d72-4ebc-b4ef-abe121034d6e"
                                 x="0"
                                 y="0"
                                 width=".135"
                                 height=".30"
                              >
                                 <circle cx="1" cy="1" r=".7" />
                              </pattern>
                           </defs>
                           <rect
                              fill="url(#dc223fcc-6d72-4ebc-b4ef-abe121034d6e)"
                              width="52"
                              height="24"
                           />
                        </svg>
                        <span className="relative">The</span>
                     </span>{' '}
                     quick, brown fox jumps over a lazy dog
                  </h2>
                  <p className="text-base text-gray-700 md:text-lg">
                     Sed ut perspiciatis unde omnis iste natus error sit
                     voluptatem accusantium doloremque rem aperiam, eaque ipsa
                     quae.
                  </p>
               </div>
               {/* BUTTON */}
               <div className="flex items-center sm:justify-center w-full">
                  <a
                     style={{
                        background: palette.primary.shade[500].hex,
                       
                     }}
                     href="#_"
                     className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group "
                  >
                     <span
                        style={{
                           background: palette.primary.shade[600].hex,
                        }}
                        className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"
                     ></span>
                     <span className="relative">Generate</span>
                  </a>
               </div>
               {/* WAVES */}
               {/* <Waves></Waves> */}
            </div>
         </div>

         <div className="relative px-4 sm:px-0">
            <div className="absolute inset-0 bg-gray-100 h-1/2" />
            <div className="relative grid mx-auto overflow-hidden bg-white divide-y rounded shadow sm:divide-y-0 sm:divide-x sm:max-w-screen-sm sm:grid-cols-3 lg:max-w-screen-md">
               <div className="inline-block p-8 text-center">
                  <div
                     style={{
                        background: palette.secondary.shade[300].hex,
                        borderRadius: '50%',
                     }}
                     className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50"
                  >
                     <svg
                        style={{
                           background: palette.secondary.shade[100].hex,
                           borderRadius: '50%',
                        }}
                        className="w-10 h-10 text-deep-purple-accent-400"
                        stroke={palette.secondary.shade[500].hex}
                        viewBox="0 0 52 52"
                     >
                        <polygon
                           strokeWidth="3"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           fill="none"
                           points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                     </svg>
                  </div>
                  <p
                     style={{ color: palette.secondary.shade[900].hex }}
                     className="font-bold tracking-wide text-gray-800"
                  >
                     Generate pallete
                  </p>
               </div>

               <div className="inline-block p-8 text-center">
                  <div
                     style={{
                        background: palette.secondary.shade[300].hex,
                        borderRadius: '50%',
                     }}
                     className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50"
                  >
                     <svg
                        style={{
                           background: palette.secondary.shade[100].hex,
                           borderRadius: '50%',
                        }}
                        className="w-10 h-10 text-deep-purple-accent-400"
                        stroke={palette.secondary.shade[500].hex}
                        viewBox="0 0 52 52"
                     >
                        <polygon
                           strokeWidth="3"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           fill="none"
                           points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                     </svg>
                  </div>
                  <p
                     style={{ color: palette.secondary.shade[900].hex }}
                     className="font-bold tracking-wide text-gray-800"
                  >
                     Modify to perfection
                  </p>
               </div>

               <div className="inline-block p-8 text-center">
                  <div
                     style={{
                        background: palette.secondary.shade[300].hex,
                        borderRadius: '50%',
                     }}
                     className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50"
                  >
                     <svg
                        style={{
                           background: palette.secondary.shade[100].hex,
                           borderRadius: '50%',
                        }}
                        className="w-10 h-10 text-deep-purple-accent-400"
                        stroke={palette.secondary.shade[500].hex}
                        viewBox="0 0 52 52"
                     >
                        <polygon
                           strokeWidth="3"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           fill="none"
                           points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                     </svg>
                  </div>
                  <p
                     style={{ color: palette.secondary.shade[900].hex }}
                     className="font-bold tracking-wide text-gray-800"
                  >
                     Use it in your project
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero
