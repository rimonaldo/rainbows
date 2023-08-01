import SemanticsBox from './Models/SemanticBox'
import NavbarBox from './Models/NavbarBox'
import ButtonsBox from './Models/ButtonsBox'
import TableBox from './Models/TableBox'
import { PaletteType } from '../types'

type Props = {
   palette:PaletteType
}

const Models = ({palette}: Props) => {
   const { info, success, warning, danger,primary,tertiary } = palette
   const colors = [info, success, warning, danger]
   

   return (
      <section className="models-container" style={{ background: tertiary.shade[100].hex }}>
         <header className="main-models-header">
            <h2 className="" style={{color:'black'}}>Models</h2>
            <h4>Lorem ipsum dolor sit amet, consectetur!</h4>
         </header>
         <div className="hover-box">
            <div className="model-cards-container">
               <div className="row1 semantics-row">
                  <SemanticsBox palette={palette} colors={[palette.info,palette.success,palette.danger,palette.warning]} />
               </div>

               <div className="row2 nav-buttons-row">
                  <NavbarBox  ></NavbarBox>
                  <ButtonsBox palette={palette}></ButtonsBox>
               </div>

               <div className="row3">
                  <TableBox palette={palette}/>
                  <div className="box2 box"></div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Models
