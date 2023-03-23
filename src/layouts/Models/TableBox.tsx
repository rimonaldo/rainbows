import React from 'react'
import { usePaletteContext } from '../../hooks/usePaletteContext'
type Props = {}

const TableBox = (props: Props) => {
    const { palette } = usePaletteContext()
    const { info, success, warning, danger } = palette
   return (
      <div className={`box1 box `}>
         <header>
            <h3>Table</h3>
         </header>

         <table className="table">
            <thead>
               <tr>
                  <th className="index">#</th>
                  <th className="name">Name</th>
                  <th className="actions"></th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td className="index">1</td>
                  <td className="name">Andrew Mike</td>
                  <td className="actions">
                     <button className="btn view">E</button>
                     <button className="btn info" style={{ background: palette.info.color.hex }}>
                        i
                     </button>
                     <button className="btn danger" style={{ background: palette.danger.color.hex }}>
                        X
                     </button>
                  </td>
               </tr>
               <tr>
                  <td className="index">2</td>
                  <td className="name">John Doe</td>
                  <td className="actions">
                     <button className="btn round view" style={{ background: palette.warning.shade[500].hex }}>
                        E
                     </button>
                     <button className="btn round info" style={{ background: palette.success.shade[900].hex }}>
                        i
                     </button>
                     <button className="btn round danger" style={{ background: palette.danger.color.hex }}>
                        X
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   )
}

export default TableBox
