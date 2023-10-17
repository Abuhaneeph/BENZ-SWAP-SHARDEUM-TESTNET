import React, { useState,useContext } from 'react'
import { UserContext } from '../../../ContextProvider/ContextProvider'
const LiquidityTab = () => {
  const{handleAddLiquidityClick,handleRemoveLiquidityClick}=useContext(UserContext)
  return (
    <div className='w3-center'>
    <div className="w3-bar w3-center w3-border-0" style={{width:"auto",borderRadius:"40px",background:"#1A1C20",marginTop:"45px"}}>
   <div onClick={handleAddLiquidityClick} className="w3-bar-item w3-bold   w3-text-white w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
      Add Liquidity
    </div>
    <div onClick={handleRemoveLiquidityClick}  className="w3-bar-item w3-gray  w3-text-white  w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
      Remove Liquidity
    </div>
     
     </div>
     </div>
  )
}

export default LiquidityTab