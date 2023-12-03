
import benz from './benz.png'

const shardeum= [

    {
        "key": 0,
        "ticker": "SHM",
        "img": "https://chaindroporg.github.io/token-list/data/logo/Shardeum.png",
        "name": "Shardeum",
        "address": "0xBcb09bAEABA0d3Ff4604520d3610c06FF7f55ad9",
        "decimals": 18,
        "pool": ["LINK","BENZ"]
    },
    
    {
        "key": 1,
        "ticker": "LINK",
        "img": "https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png",
        "name": "Chainlink",
        "address": "0x3de9fd008de2dba0dde425c2059380122c7cb189",
        "decimals": 18,
        "pool": ["BENZ"]
    },

    {
        "key": 2,
        "ticker": "DAI",
        "img": "https://cdn.moralis.io/eth/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        "name": "Dai Stablecoin",
        "address": "0xd54e1379c3c1b400818a7bc2dcfecc5e3f7d884b",
        "decimals": 18,
        "pool": ["NEAR","TRX"]
    },

    {
        "key": 3,
        "ticker": "NEAR",
        "img": "https://etherscan.io/token/images/near_32.png",
        "name": "NEAR",
        "address": "0x543879308a813b3d1fee5bd84fde861d537699f8",
        "decimals": 18,
        "pool": ["COMP"]
    },

   
  
    {
        "key": 4,
        "ticker": "COMP",
        "img": "https://etherscan.io/token/images/comp_32.png",
        "name": "Compound",
        "address": "0x232aad86ef0cdc03cf3f39f6f37aa42af4b0f1fb",
        "decimals": 18,
        "pool": ["DAI"]
    },
    
    {
        "key": 5,
        "ticker": "TRX",
        "img": "https://etherscan.io/token/images/trontrx_32.png",
        "name": "TRON",
        "address": "0x73398b0b3176456dcaee855d9c723288bc512f9e",
        "decimals": 18,
        "pool": ["BENZ"]
    },
    
    {
        "key": 6,
        "ticker": "AAVE",
        "img": "https://cdn.moralis.io/eth/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
        "name": "AAVE",
        "address": "0x312e2ab846e7c0e8a5faebb19efd01f5e946a54c",
        "decimals": 18,
        "pool": ["TRX"]
    },

    {
        "key": 7,
        "ticker": "BENZ",
        "img": benz,
        "name": "BENZ",
        "address": "0x57623d612f6bce1d848bc6023125feb2100f8f9f",
        "decimals": 18,
        "pool": ["AAVE","COMP"]
    },



    /*
    {
        "key": 7,
        "ticker": "SUSHI",
        "img": "https://cdn.moralis.io/eth/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png",
        "name": "SUSHI TOKEN",
        "address": "",
        "decimals": 18,
        "pool": ["NEAR","SHM"]
    },
  */

]




export default shardeum