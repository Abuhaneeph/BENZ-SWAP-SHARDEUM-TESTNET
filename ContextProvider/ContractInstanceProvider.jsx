import React,{createContext} from 'react'
import { P2P_ADDRESS } from '../const/Contract/Contract_Addresses';
import { P2P_ABI } from '../const/ABI/P2P_ABI';
import { PRICEAPI_ADDRESS } from '../const/Contract/Contract_Addresses';
import { PRICE_ABI } from '../const/ABI/PriceAPI_ABI';
import { Test_Token_ABI } from '../const/ABI/Test_Token_ABI';
import { useSigner } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
export const ContractInstances = createContext()


const ContractInstanceProvider = ({children}) => {
  const signer =useSigner()
  
  async function P2P_CONTRACT_INSTANCE (){
 
    const P2P_CONTRACT_INSTANCE =new ethers.Contract(P2P_ADDRESS, P2P_ABI , signer);
    return P2P_CONTRACT_INSTANCE;
  }
   async function PRICEAPI_CONTRACT_INSTANCE(){
    const PRICEAPI_CONTRACT_INSTANCE=new ethers.Contract(PRICEAPI_ADDRESS, PRICE_ABI , signer);
    return PRICEAPI_CONTRACT_INSTANCE;
   }

   async function TEST_TOKEN_CONTRACT_INSTANCE(TOKEN_ADDRESS){
    const TEST_TOKEN_CONTRACT =  new ethers.Contract(TOKEN_ADDRESS,Test_Token_ABI,signer)
    return TEST_TOKEN_CONTRACT;
   }
  async function getSellerList(){
      const P2P_CONTRACT = await P2P_CONTRACT_INSTANCE();
      const sellerLists= await P2P_CONTRACT.getSellersOrders()
      
  }
    

    
 
    return (
    <ContractInstances.Provider value={{TEST_TOKEN_CONTRACT_INSTANCE,PRICEAPI_CONTRACT_INSTANCE,P2P_CONTRACT_INSTANCE,getSellerList}}>
        {children}
    </ContractInstances.Provider>
  )
}

export default ContractInstanceProvider