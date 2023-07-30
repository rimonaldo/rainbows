export const utilService = {
   getRandomHex: () => {
      const hex = Math.floor(Math.random() * 16777215).toString(16)
      return `#${hex}`
   },
}
