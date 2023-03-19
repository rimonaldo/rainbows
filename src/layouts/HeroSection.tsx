import React from 'react'

type Props = {}

const HeroSection = (props: Props) => {
   return (
      <section className="hero">
         <h1 >
            Rainbow<span>s</span>
         </h1>
         <h2 className="tagline">A color palette generator for your next project</h2>
         <p className="description">
            See how the colors in our plate can be used in design elements to create a cohesive and visyally appealing
            design
         </p>
      </section>
   )
}

export default HeroSection
