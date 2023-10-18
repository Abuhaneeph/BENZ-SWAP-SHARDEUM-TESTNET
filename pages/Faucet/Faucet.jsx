import React, { useState,useContext } from 'react'
import ReactDOM from 'react-dom/client'
import {Input,Button, Radio, Modal, message } from "antd";
import FaucetModal from '../../src/components/FaucetModal/FaucetModal';
import { UserContext2 } from '../../ContextProvider/ContextProvider2';
import { addTokenToMetamask } from '../../utils/constants';
import { ContractInstances } from '../../ContextProvider/ContractInstanceProvider';
import { useAddress } from '@thirdweb-dev/react';


ReactDOM.createRoot(document.getElementById('root')).render(
const Faucet = () => {
  const address = useAddress()
  const{faucetToken}=useContext(UserContext2)
  const[faucetAmount,setFaucetAmount]=useState(null)
  const{TEST_TOKEN_CONTRACT_INSTANCE}=useContext(ContractInstances)
   const[isFaucet,setFaucet]=useState(false)
const AddToMetamask=async()=>{
 
addTokenToMetamask(faucetToken.address, faucetToken.ticker, Number(faucetToken.decimals), faucetToken.img)


}
  

  const getFaucet=async()=>{
   
      try{
        
         const TOKEN_CONTRACT=await TEST_TOKEN_CONTRACT_INSTANCE(faucetToken.address);
          const   GET_FAUCET =await TOKEN_CONTRACT.faucet(faucetAmount);
          setFaucet(true) 
          console.log(`Loading - ${GET_FAUCET.hash}`);
               await GET_FAUCET.wait();
               console.log(`Success - ${GET_FAUCET.hash}`);
               setFaucet(false);
      }catch(error){
       setFaucet(false);
     console.log(error)
    
  }
}
  return (
<>
<div className="faucetBox w3-margin-left w3-margin-right w3-display-middle w3-margin-right" style={{}}>
        <div className="tradeBoxHeader">
          <h4 style={{color:"white",fontWeight:"bolder",fontSize:"18px"}}>Faucet</h4>
          
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={faucetAmount}
            
             onChange={(e)=>{setFaucetAmount(e.target.value)}}
           
          />
          
         

          <div className="assetOnes"  >
          <FaucetModal/>
          </div>

         
          
          
        </div>
        
        <Button loading={isFaucet ? true : false} disabled={!faucetAmount || !address}  className="faucetBtn w3-border-0" onClick={getFaucet} >{isFaucet ? 'Getting Faucet' : 'Get Faucet'}</Button>
        <Button  style={{marginBottom:"9px"}} className="faucetBtn w3-border-0" onClick={AddToMetamask} >Add to Metamask</Button>


      </div> 




</>
    
 // DAI/USDT     998550000000000000

// NEAR/USDT   1004700000000000000


//AAVE/USDT     62810000000000000000

//UNI/USDT     4078300000000000000

//COMP/USDT   40630000000000000000   

// TRX/USDT  88149333333333333


//LINK/USD  730600000

      

  
  )
}

export default Faucet

)