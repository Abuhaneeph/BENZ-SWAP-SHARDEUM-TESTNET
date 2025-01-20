// TokensProvider.js

import { createContext, useContext, useState, useEffect } from 'react';
import goerli from '../src/TokenList/goerli';

import shardeum from '../src/TokenList/shardeum';
import { S_SWAP_ADDRESS, S_P2P_ADDRESS, S_PRICEAPI_ADDRESS, G_P2P_ADDRESS, G_PRICE_ADDRESS, G_SWAP_ADDRESS, Z_PRICE_ADDRESS, Z_P2P_ADDRESS, Z_SWAP_ADDRESS } from '../const/Contract/Contract_Addresses';
import { useChainId, useAddress } from '@thirdweb-dev/react';
import zetachain from '../src/TokenList/zetachain';

const TokenServiceContext = createContext();

export const useTokenService = () => {
  return useContext(TokenServiceContext);
};

const TokensProvider = ({ children }) => {
  const [TokenList, setTokenList] = useState(shardeum);
  const [priceFeedAddress, setPriceFeedAddress] = useState('');
  const [swapAddress, setSwapAddress] = useState('');
  const [p2pAddress, setP2PAddress] = useState('');
  const address = useAddress();
  const chainId = useChainId();

  useEffect(() => {
    if (!address) {
      setTokenList(shardeum);
    } else {
      if (chainId === 8081) {
        setTokenList(shardeum)
        setPriceFeedAddress(S_PRICEAPI_ADDRESS);
        setP2PAddress(S_P2P_ADDRESS);
        setSwapAddress(S_SWAP_ADDRESS);
      } else if (chainId === 5) {
        setTokenList(goerli)
        setPriceFeedAddress(G_PRICE_ADDRESS);
        setP2PAddress(G_P2P_ADDRESS);
        setSwapAddress(G_SWAP_ADDRESS);
      }else if(chainId === 7001){
        setTokenList(zetachain);
        setPriceFeedAddress(Z_PRICE_ADDRESS);
        setP2PAddress(Z_P2P_ADDRESS);
        setSwapAddress(Z_SWAP_ADDRESS);
      }
    }
  }, [chainId, setTokenList]);

  const contextValue = {
    TokenList,setTokenList, priceFeedAddress, swapAddress, p2pAddress, setPriceFeedAddress, setP2PAddress, setSwapAddress,
  };

  return (
    <TokenServiceContext.Provider value={contextValue}>
      {children}
    </TokenServiceContext.Provider>
  );
};

export default TokensProvider;
