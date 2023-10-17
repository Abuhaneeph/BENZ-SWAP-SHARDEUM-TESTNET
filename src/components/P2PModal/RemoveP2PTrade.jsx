import React, { useState,useContext } from 'react'
import {Input,Button } from "antd";
import "./P2P.css"
import { ContractInstances } from '../../../ContextProvider/ContractInstanceProvider';
const RemoveP2PTrade = () => {
  const{P2P_CONTRACT_INSTANCE}=useContext(ContractInstances)
    const[ID,setID]=useState(null)
 const[isRemove,setRemove]=useState(false)

    const removeP2PTrade = async()=>{
         const P2P_CONTRACT = await P2P_CONTRACT_INSTANCE();
         const removeTrade= await P2P_CONTRACT.removeTokenListing(ID);
        setRemove(true) 
     console.log(`Loading - ${removeTrade.hash}`);
          await removeTrade.wait();
          console.log(`Success - ${removeTrade.hash}`);
          setRemove(false);
    }
    
  return (
    <div><div>
    <div className="removeP2PBox w3-margin-top w3-margin-bottom" style={{margin:"0 auto",marginTop:"40px"}}>
   
    <div className="inputs w3-margin-top"> 
      <Input
        placeholder="0"
        value={ID}
         onChange={(e)=>{setID(e.target.value)}}
        
       
      />
       
     

    
      
      
    </div>
    
    <Button loading={isRemove ?true : false} className="w3-border-0 removeP2PBtn" disabled={!ID} onClick={removeP2PTrade}>{isRemove ? 'Removing Trade' : 'Remove Trade'}</Button>
  </div> 
</div></div>
  )
}

export default RemoveP2PTrade