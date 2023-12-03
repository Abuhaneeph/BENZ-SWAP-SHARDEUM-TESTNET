import React, { useState } from 'react'
import P2PTab from './P2PTab'
import P2PHome from './P2PHome'
import RemoveP2PTrade from './RemoveP2PTrade'
const P2PIndex = () => {
    const[isPlaceP2PTrade,setPlaceP2PTrade]=useState(true)
    const handlePlaceTradeClick = () => {
        setPlaceP2PTrade(true);
      };
    
      const handleRemovePlaceTradeClick = () => {
        setPlaceP2PTrade(false);
      };
  return (
    <div>

   <P2PTab handlePlaceTradeClick={handlePlaceTradeClick} handleRemovePlaceTradeClick={handleRemovePlaceTradeClick}  />
  {isPlaceP2PTrade ? <P2PHome/> : <RemoveP2PTrade/>  }

    </div>
  )
}

export default P2PIndex