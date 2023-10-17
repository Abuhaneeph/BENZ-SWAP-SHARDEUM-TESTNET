import React from 'react'

const P2PTab = ({handlePlaceTradeClick,handleRemovePlaceTradeClick}) => {
    
    return (
      <div className='w3-center'>
      <div className="w3-bar w3-center w3-border-0" style={{width:"auto",borderRadius:"40px",background:"#1A1C20",marginTop:"30px"}}>
     <div onClick={handlePlaceTradeClick} className="w3-bar-item w3-bold   w3-text-white w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
        Place P2P-Trade
      </div>
      <div onClick={handleRemovePlaceTradeClick} className="w3-bar-item w3-gray  w3-text-white  w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
        Remove P2P-Trade
      </div>
       
       </div>
       </div>
    )
}

export default P2PTab