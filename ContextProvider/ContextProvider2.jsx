import React, { createContext, useState, useEffect } from 'react';
import { useTokenService } from './TokensProvider';
import { useChainId,useAddress } from '@thirdweb-dev/react';
import goerli from '../src/TokenList/goerli';
import { S_PRICEAPI_ADDRESS,S_P2P_ADDRESS,S_SWAP_ADDRESS,G_P2P_ADDRESS,G_PRICE_ADDRESS,G_SWAP_ADDRESS } from '../const/Contract/Contract_Addresses';

export const UserContext2 = createContext();

const ContextProvider2 = ({ children }) => {
  const { TokenList: originalTokenList,setPriceFeedAddress,setP2PAddress,setSwapAddress } = useTokenService();
  const chainId = useChainId();

  const [isHandleCreatePool, setHandleCreatePool] = useState(true);
  const [isFaucetModal, setOpenFaucetModal] = useState(false);
  const [faucetToken, setFaucetToken] = useState(originalTokenList[1]);

  const [selectedValues, setSelectedValues] = useState([]);
  const [isP2PModal, setOpenP2PModal] = useState(false);
  const [peerToken, setPeerToken] = useState(originalTokenList[0]);

  const [isOpenTokensModal, setOpenTokensModal] = useState(false);
  const [Token, setToken] = useState(originalTokenList[0]);
   const address =useAddress()
  useEffect(() => {

    if(!address){
      setToken(originalTokenList[0])
      setPeerToken(originalTokenList[0]); // Set a default token or adjust as needed
      setFaucetToken(originalTokenList[1]); // Set a default token or adjust as needed

    }else{
    // Update token list when chainId changes
    const updatedTokenList = chainId === 8081 ? originalTokenList : goerli;
    setToken(updatedTokenList[0]); // Set a default token or adjust as needed
    setPeerToken(updatedTokenList[0]); // Set a default token or adjust as needed
    setFaucetToken(updatedTokenList[1]); // Set a default token or adjust as needed

      // Update addresses based on chainId
  if (chainId === 8081) {
    setPriceFeedAddress(S_PRICEAPI_ADDRESS);
    setP2PAddress(S_P2P_ADDRESS);
    setSwapAddress(S_SWAP_ADDRESS);
  } else {
    setPriceFeedAddress(G_PRICE_ADDRESS);
    setP2PAddress(G_P2P_ADDRESS);
    setSwapAddress(G_SWAP_ADDRESS);
  }
}

  }, [chainId, originalTokenList]);

  const openTokenModal = () => {
    setOpenTokensModal(true);
  };

  function modifyToken(i) {
    setToken(originalTokenList[i]);
    setOpenTokensModal(false);
  }

  function modifyP2P(i) {
    setPeerToken(originalTokenList[i]);
    setOpenP2PModal(false);
  }

  const openP2PModal = () => {
    setOpenP2PModal(true);
  };

  const handleChange = (values) => {
    setSelectedValues(values);
  };

  function modifyFaucet(i) {
    setFaucetToken(originalTokenList[i]);
    setOpenFaucetModal(false);
  }

  const openFaucetModal = () => {
    setOpenFaucetModal(true);
  };

  const handleCreatePoolClick = () => {
    setHandleCreatePool(true);
  };

  const handleRemoveCreatePoolClick = () => {
    setHandleCreatePool(false);
  };

  return (
    <UserContext2.Provider
      value={{
        modifyToken,
        openTokenModal,
        Token,
        setToken,
        isOpenTokensModal,
        setOpenTokensModal,
        openP2PModal,
        modifyP2P,
        peerToken,
        setPeerToken,
        isP2PModal,
        setOpenP2PModal,
        handleChange,
        selectedValues,
        setSelectedValues,
        faucetToken,
        setFaucetToken,
        isFaucetModal,
        openFaucetModal,
        setOpenFaucetModal,
        modifyFaucet,
        handleCreatePoolClick,
        handleRemoveCreatePoolClick,
        isHandleCreatePool,
        setHandleCreatePool,
      }}
    >
      {children}
    </UserContext2.Provider>
  );
};

export default ContextProvider2;
