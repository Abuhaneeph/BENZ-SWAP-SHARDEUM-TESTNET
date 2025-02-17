
/*
import React from 'react';
import benz from './benz.png';
import goerli from './goerli';
import shardeum from './shardeum';
import { useChainId } from '@thirdweb-dev/react';

const TokenComp = () => {
  const chain = useChainId();
  
  let TokenList = [];

  if (chain === 8081) {
    TokenList = shardeum;
  } else {
    TokenList = goerli;
  }

  return TokenList;
};

export default TokenComp;
*/
const FaucetList= [
    
    {
        "key": 0,
        "ticker": "LINK",
        "img": "https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png",
        "name": "Chainlink",
        "address": "0x629A22642343AFFbD654C93E99b17b431ceA3AB8",
        "decimals": 18,
        "pool": ["NEAR","SHM"]
    },
 
    {
        "key": 1,
        "ticker": "DAI",
        "img": "https://cdn.moralis.io/eth/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        "name": "Dai Stablecoin",
        "address": "0xF5e3374Ba80F6058a2A1a99b6718409e21984df5",
        "decimals": 18,
        "pool": ["NEAR","SHM"]
    },

    {
        "key": 2,
        "ticker": "NEAR",
        "img": "https://etherscan.io/token/images/near_32.png",
        "name": "NEAR",
        "address": "0x3d7Fb8406659F2c8d142f60a16b332821e411971",
        "decimals": 18,
        "pool": ["DAI","TRX"]
    },

   
  
    {
        "key": 3,
        "ticker": "COMP",
        "img": "https://etherscan.io/token/images/comp_32.png",
        "name": "Compound",
        "address": "0x5B82A8DA50D42910Cb3E1Dc42F92C4f02116968c",
        "decimals": 18,
        "pool": ["SUSHI","SHM"]
    },
    
    {
        "key": 4,
        "ticker": "TRX",
        "img": "https://etherscan.io/token/images/trontrx_32.png",
        "name": "TRON",
        "address": "0x543879308A813B3D1FEe5Bd84Fde861d537699F8",
        "decimals": 18,
        "pool": ["COMP","NEAR"]
    },
    
    {
        "key": 5,
        "ticker": "AAVE",
        "img": "https://cdn.moralis.io/eth/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
        "name": "AAVE",
        "address": "0xD73713fD695D0fefc5C77Ac27058BEB2cB5cd250",
        "decimals": 18,
        "pool": ["LINK","TRX"]
    },
    /*
    {
        "key": 6,
        "ticker": "SUSHI",
        "img": "https://cdn.moralis.io/eth/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png",
        "name": "SUSHI TOKEN",
        "address": "",
        "decimals": 18,
        "pool": ["NEAR","SHM"]
    },
  */

]




export default FaucetList