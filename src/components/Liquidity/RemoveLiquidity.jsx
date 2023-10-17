import React, { useState } from 'react'
import {Input,Button } from "antd";
import { useAddress } from '@thirdweb-dev/react';
const RemoveLiquidity = () => {
    const[ID,setID]=useState(null)
    const address =useAddress()
    
  return (
    <div><div>
    <div className="liquidityBox w3-margin-top w3-margin-bottom" style={{margin:"0 auto",marginTop:"40px"}}>
   
    <div className="inputs w3-margin-top"> 
      <Input
        placeholder="0"
        value={ID}
        
        disabled
       
      />
       
     

    
      
      
    </div>
    
    <Button style={{marginBottom:"9px"}} className="faucetBtn w3-border-0 " disabled={!ID  || !address}>Remove Liquidity</Button>
  </div> 
</div></div>
  )
}

export default RemoveLiquidity