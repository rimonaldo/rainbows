import React, { useEffect } from 'react'
import { usePaletteContext } from '../../hooks/usePaletteContext'
import { ColorType } from '../../types/ColorType'
import { useColorContext } from '../../hooks/useColorContext'
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
   
   let css = `
    @import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
	box-sizing: border-box;
}

body {
	background-color: #28223F;
	font-family: Montserrat, sans-serif;
	
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	min-height: 100vh;
	margin: 0;
}

h3 {
	margin: 10px 0;
}

h6 {
	margin: 5px 0;
	text-transform: uppercase;
}

p {
	font-size: 14px;
	line-height: 21px;
}

.card-container {
	background-color: #231E39;
	border-radius: 5px;
	box-shadow: 0px 10px 20px -10px rgba(0,0,0,0.75);
	color: #B3B8CD;
	padding-top: 30px;
	position: relative;
	width: 350px;
	max-width: 100%;
	text-align: center;
}

.card-container .pro {
	color: #231E39;
	background-color: #FEBB0B;
	border-radius: 3px;
	font-size: 14px;
	font-weight: bold;
	padding: 3px 7px;
	position: absolute;
	top: 30px;
	left: 30px;
}

.card-container .round {
	border: 1px solid #03BFCB;
	border-radius: 50%;
	padding: 7px;
}

button.primary {
	background-color: #03BFCB;
	border: 1px solid #03BFCB;
	border-radius: 3px;
	color: #231E39;
	font-family: Montserrat, sans-serif;
	font-weight: 500;
	padding: 10px 25px;
}

button.primary.ghost {
	background-color: transparent;
	color: #02899C;
}

.skills {
	background-color: #1F1A36;
	text-align: left;
	padding: 15px;
	margin-top: 30px;
}

.skills ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

.skills ul li {
	border: 1px solid #2D2747;
	border-radius: 2px;
	display: inline-block;
	font-size: 12px;
	margin: 0 7px 7px 0;
	padding: 7px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}
    `

   return (
      <div>
         <style>{css}</style>
         <div className="card-container" style={{ background: color.hex,boxShadow: '0px 10px 20px -10px rgba(0,0,0,0.75)' }}>
            <span className="pro">PRO</span>
            <img className="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
            <h3>Ricky Park</h3>
            <h6>New York</h6>
            <p>
               User interface designer and <br /> front-end developer
            </p>
            <div className="buttons">
               <button className="primary">Message</button>
               <button className="primary ghost">Following</button>
            </div>
            <div className="skills">
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