
import benz from './benz.png'

const zetachain= [

    {
        "key": 0,
        "ticker": "ZETA",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnl8MxMV9JBwFdj2diT1hURrnLFzLGWjh5MrXlUZDRwzBrK-xf",
        "name": "ZETA",
        "address": "0xBcb09bAEABA0d3Ff4604520d3610c06FF7f55ad9",
        "decimals": 18,
        "pool": ["LINK","BENZ"]
    },
    
    {
        "key": 1,
        "ticker": "LINK",
        "img": "https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png",
        "name": "Chainlink",
        "address": "0x6e10b3402b6b07eE5a7a8b6e19adF663f9d0f1A2",
        "decimals": 18,
        "pool": ["BENZ","DAI"]
    },

    {
        "key": 2,
        "ticker": "DAI",
        "img": "https://cdn.moralis.io/eth/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        "name": "Dai Stablecoin",
        "address": "0x487A3F1ca3A580dC29F65EC05B202E433E5F4bd7",
        "decimals": 18,
        "pool": ["NEAR","TRX"]
    },

    {
        "key": 3,
        "ticker": "NEAR",
        "img": "https://etherscan.io/token/images/near_32.png",
        "name": "NEAR",
        "address": "0xef55D8A58588dD34CbF894F416A6d3d57F40e5AA",
        "decimals": 18,
        "pool": ["COMP"]
    },

   
  
    {
        "key": 4,
        "ticker": "COMP",
        "img": "https://etherscan.io/token/images/comp_32.png",
        "name": "Compound",
        "address": "0x0D3c7c4286d3719189A2228c6c1A95f680dDB87b",
        "decimals": 18,
        "pool": ["DAI"]
    },
    
    {
        "key": 5,
        "ticker": "TRX",
        "img": "https://etherscan.io/token/images/trontrx_32.png",
        "name": "TRON",
        "address": "0x91aD0E3b5991D66d35304bbEb5142D1097E1aFD1",
        "decimals": 18,
        "pool": ["BENZ"]
    },
    
    {
        "key": 6,
        "ticker": "AAVE",
        "img": "https://cdn.moralis.io/eth/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
        "name": "AAVE",
        "address": "0xA8b8a3A3eD1657E44779E11d0F122D1ed1B70e4a",
        "decimals": 18,
        "pool": ["TRX"]
    },

    {
        "key": 7,
        "ticker": "BENZ",
        "img": benz,
        "name": "BENZ",
        "address": "0x5552b73B17ade11c4B9Aa440dc1c35F2436f5901",
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




export default zetachain