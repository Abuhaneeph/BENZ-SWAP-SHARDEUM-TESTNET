import React, { useState,useContext,useEffect } from 'react'

import {Input,Button } from "antd";
import FaucetModal from '../../src/components/FaucetModal/FaucetModal';
import { UserContext2 } from '../../ContextProvider/ContextProvider2';
import { addTokenToMetamask } from '../../utils/constants';
import { ContractInstances } from '../../ContextProvider/ContractInstanceProvider';
import { useAddress } from '@thirdweb-dev/react';
import { roundToTwoDecimalPlaces } from '../../utils/constants';



const Faucet = () => {
  const address = useAddress()
  const{faucetToken}=useContext(UserContext2)
   const[Bal,setBal] = useState('')
 
  const[faucetAmount,setFaucetAmount]=useState(null)
  const{TEST_TOKEN_CONTRACT_INSTANCE,fetchBalance}=useContext(ContractInstances)
 
  const[isFaucet,setFaucet]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bal = await fetchBalance(faucetToken.address);
        setBal(Number(roundToTwoDecimalPlaces(bal)))
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [faucetToken, address,Bal]);
  

   
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

<div className='w3-display-middle'>
<div className="faucetBox"  >
        <div className="tradeBoxHeader">
          <h4 style={{color:"white",fontWeight:"bolder",fontSize:"18px"}}>Faucet</h4>
          <h4 style={{color:"white",fontWeight:"bolder",fontSize:"14px"}} className='w3-right'>MAX. ALLOCATION : 100</h4>
          
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
       
          <div className="assetSecond"  >
    { address && !isNaN(Bal) &&  (<p style={{color: "#5f6783"}}>Bal : {Bal} {faucetToken.ticker} </p>) }
          </div>
   
          
          
        </div>


        
        <Button loading={isFaucet ? true : false} disabled={!faucetAmount || !address}  className="faucetBtn w3-border-0" onClick={getFaucet} >{isFaucet ? 'Getting Faucet' : 'Get Faucet'}</Button>
        <Button  style={{marginBottom:"9px"}} className="faucetBtn w3-border-0" onClick={AddToMetamask} >Add to Metamask</Button>


      </div> 

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

