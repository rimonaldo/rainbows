import React from 'react'

interface TriadicProps {
   triad: string[]
}

function Triadic({ triad }: TriadicProps) {
   return (
      <div className="triad scheme">
         <div className="color c-2" style={{ backgroundColor: triad[1] }}></div>
         <div className="color c-1" style={{ backgroundColor: triad[0] }}></div>
         <div className="color c-3" style={{ backgroundColor: triad[2] }}></div>
      </div>
   )
}

export default Triadic
