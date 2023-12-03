import React, { useState,useContext } from 'react'
import {Input,Button } from "antd";
import { useAddress } from '@thirdweb-dev/react';
import { ContractInstances } from '../../../ContextProvider/ContractInstanceProvider';

const RemoveLiquidity = () => {
  const { SWAP_CONTRACT_INSTANCE} = useContext(ContractInstances);
  const[isRemoveLiquid,setIsRemoveLiquid]=useState(false)
    const[ID,setID]=useState(null)
    const address =useAddress()

    const REMOVE_LIQUID=async()=>{
      try{
        const SWAP_CONTRACT= await SWAP_CONTRACT_INSTANCE();  
       const REMOVE_LIQUID =await SWAP_CONTRACT.removeLiquidity(ID); 
       console.log(`Loading - ${REMOVE_LIQUID.hash}`);
       setIsRemoveLiquid(true)
        await REMOVE_LIQUID.wait();
      console.log(`Success - ${REMOVE_LIQUID.hash}`);
      setIsRemoveLiquid(false)
      }catch(error){
       setIsRemoveLiquid(false)
       console.log(error)
      }

      
    }
    
  return (
    <div><div>
    <div className="liquidityBox w3-margin-top w3-margin-bottom" style={{margin:"0 auto",marginTop:"40px"}}>
   
    <div className="inputs w3-margin-top"> 
      <Input
        placeholder="Liquid ID"
        value={ID}
        onChange={(e)=>{setID(e.target.value)}}
        
        
       
      />
       
     

    
      
      
    </div>
    
    <Button loading={isRemoveLiquid ? true : false} onClick={REMOVE_LIQUID} style={{marginBottom:"9px"}} className="faucetBtn w3-border-0 " disabled={!ID  || !address}>{isRemoveLiquid ? 'Removing Liquid' : 'Remove Liquid'}</Button>
  </div> 
</div></div>
  )
}

export default RemoveLiquidity