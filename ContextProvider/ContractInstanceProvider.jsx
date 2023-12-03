// ContractInstanceProvider.js

import React, { createContext, useState } from 'react';
import { P2P_ABI } from '../const/ABI/P2P_ABI';
import { PRICE_ABI } from '../const/ABI/PriceAPI_ABI';
import { SWAP_ABI } from '../const/ABI/SWAP_ABI';
import { Test_Token_ABI } from '../const/ABI/Test_Token_ABI';
import { useSigner,useBalance } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useTokenService } from './TokensProvider';
import { useAddress } from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
export const ContractInstances = createContext();

const ContractInstanceProvider = ({ children }) => {
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  console.log(data)
  const signer = useSigner();
  const address = useAddress()
  const {p2pAddress,swapAddress,priceFeedAddress,TokenList}= useTokenService();
   
  
    const fetchBalance = async (faucet_address) => {
      try {
        const TOKEN_CONTRACT = await TEST_TOKEN_CONTRACT_INSTANCE(faucet_address);
        if (TokenList[0].address == faucet_address) {
        return data.displayValue;       

        }else{
          const bal = await TOKEN_CONTRACT.balanceOf(address);
          const formattedBal= ethers.utils.formatEther(bal)
       return formattedBal;
        }
      } catch (error) {
        console.error(error);
      }
    };

   

  async function P2P_CONTRACT_INSTANCE() {
    const P2P_CONTRACT_INSTANCE = new ethers.Contract(p2pAddress, P2P_ABI, signer);
    return P2P_CONTRACT_INSTANCE;
  }

  async function SWAP_CONTRACT_INSTANCE() {
    const SWAP_CONTRACT_INSTANCE = new ethers.Contract(swapAddress, SWAP_ABI, signer);
    return SWAP_CONTRACT_INSTANCE;
  }

  async function PRICEAPI_CONTRACT_INSTANCE() {
    const PRICEAPI_CONTRACT_INSTANCE = new ethers.Contract(priceFeedAddress, PRICE_ABI, signer);
    return PRICEAPI_CONTRACT_INSTANCE;
  }

  async function TEST_TOKEN_CONTRACT_INSTANCE(TOKEN_ADDRESS) {
    const TEST_TOKEN_CONTRACT = new ethers.Contract(TOKEN_ADDRESS, Test_Token_ABI, signer);
    return TEST_TOKEN_CONTRACT;
  }

  async function getSellerList() {
    const P2P_CONTRACT = await P2P_CONTRACT_INSTANCE();
    const sellerLists = await P2P_CONTRACT.getSellersOrders();
  }

  return (
    <ContractInstances.Provider value={{fetchBalance,SWAP_CONTRACT_INSTANCE, TEST_TOKEN_CONTRACT_INSTANCE, PRICEAPI_CONTRACT_INSTANCE, P2P_CONTRACT_INSTANCE, getSellerList }}>
      {children}
    </ContractInstances.Provider>
  );
}

export default ContractInstanceProvider;
