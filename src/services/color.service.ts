import { Nimble } from 'aws-sdk'

export function getTriadic(hex: string) {
   const rgb: number[] | null = hexToRgb(hex)
   if (!rgb) return []

   const r = rgb[0]
   const g = rgb[1]
   const b = rgb[2]
   //    rgb works

   const hsl = rgbToHsl(r, g, b)

   // to get triad (h+120) % 360
   const h = (hsl[0] + 120) % 360
   const s = hsl[1]
   const l = hsl[2]
   const color1 = hslToRgb(h, s, l)
   const color2 = hslToRgb((h + 120) % 360, s, l)

   return [hex, rgbToHex(color1), rgbToHex(color2)]
}

export function getMonochromatic(hex: string): string[] {
   // Parse the hex color and extract its red, green, and blue values
   const red = parseInt(hex.substring(1, 3), 16)
   const green = parseInt(hex.substring(3, 5), 16)
   const blue = parseInt(hex.substring(5, 7), 16)

   // Create an array to store the monochromatic colors
   const monochromaticColors: string[] = []

   // Generate a range of monochromatic colors
   for (let i = 0; i <= 9; i++) {
      // Calculate the color values for the current iteration
      const colorRed = Math.round(red * (1 - i / 9))
      const colorGreen = Math.round(green * (1 - i / 9))
      const colorBlue = Math.round(blue * (1 - i / 9))

      // Create a hex string for the color values
      const colorHex = `#${colorRed.toString(16).padStart(2, '0')}${colorGreen.toString(16).padStart(2, '0')}${colorBlue
         .toString(16)
         .padStart(2, '0')}`

      // Add the color to the array
      monochromaticColors.push(colorHex)
   }

   return [monochromaticColors[0], monochromaticColors[2], monochromaticColors[4]]
}

export function getComplementary(color: string): string[] {
   // First, we need to convert the hex color string to RGB values
   const rgb: number[] | null = hexToRgb(color)
   if (!rgb) return []

   // Then, we can use the RGB values to get the complementary color by subtracting
   // each value from 255
   const compR = 255 - rgb[0] 
   const compG = 255 - rgb[1] 
   const compB = 255 - rgb[2] 
   let compRgb: [r: number, g: number, b: number] = [compR, compG, compB]
   // Finally, we convert the complementary RGB values back to a hex color string
   // and return it
   let colors = [color, rgbToHex(compRgb)]
   return colors
}

const hexToRgb = (hex: string) => {
   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
   return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
   r /= 255
   g /= 255
   b /= 255
   const l = Math.max(r, g, b)
   const s = l - Math.min(r, g, b)
   const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0
   return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
   ]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
   s /= 100
   l /= 100
   const k = (n: number) => (n + h / 30) % 12
   const a = s * Math.min(l, 1 - l)
   const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
   return [255 * f(0), 255 * f(8), 255 * f(4)]
}

function rgbToHex(color: [r: number, g: number, b: number]): string {
   let r = color[0]
   let g = color[1]
   let b = color[2]
   return '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')
}
