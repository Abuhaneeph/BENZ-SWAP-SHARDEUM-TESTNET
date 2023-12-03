
import benz from './benz.png'

const goerli= [

    {
        "key": 0,
        "ticker": "ETH",
        "img": "https://assets.pancakeswap.finance/web/native/1.png",
        "name": "Ethereum",
        "address": "0xBcb09bAEABA0d3Ff4604520d3610c06FF7f55ad9",
        "decimals": 18,
        "pool": ["LINK","BENZ"]
    },
    
    {
        "key": 1,
        "ticker": "LINK",
        "img": "https://cdn.moralis.io/eth/0x514910771af9ca656af840dff83e8264ecf986ca.png",
        "name": "Chainlink",
        "address": "0xD652D9C2d166FEfa0886c70d9461C2F2965b65e6",
        "decimals": 18,
        "pool": ["BENZ"]
    },

    {
        "key": 2,
        "ticker": "DAI",
        "img": "https://cdn.moralis.io/eth/0x6b175474e89094c44da98b954eedeac495271d0f.png",
        "name": "Dai Stablecoin",
        "address": "0x61e99C5F3883A548Dd3907F8A0B4a9B05c195289",
        "decimals": 18,
        "pool": ["NEAR","TRX"]
    },

    {
        "key": 3,
        "ticker": "NEAR",
        "img": "https://etherscan.io/token/images/near_32.png",
        "name": "NEAR",
        "address": "0x5fB5A81A495Ec9842016001fBF3745f40B7de7cc",
        "decimals": 18,
        "pool": ["COMP"]
    },

   
  
    {
        "key": 4,
        "ticker": "COMP",
        "img": "https://etherscan.io/token/images/comp_32.png",
        "name": "Compound",
        "address": "0x47f887ff5FA94df0Bc1F6E9bF18Da8F2F77a09FF",
        "decimals": 18,
        "pool": ["DAI"]
    },
    
    {
        "key": 5,
        "ticker": "TRX",
        "img": "https://etherscan.io/token/images/trontrx_32.png",
        "name": "TRON",
        "address": "0x882F92ad461530C065F136f8dF49397C2956d489",
        "decimals": 18,
        "pool": ["BENZ"]
    },
    
    {
        "key": 6,
        "ticker": "AAVE",
        "img": "https://cdn.moralis.io/eth/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
        "name": "AAVE",
        "address": "0xF04866F98a77481d9a46958948692897c98D37b1",
        "decimals": 18,
        "pool": ["TRX"]
    },

    {
        "key": 7,
        "ticker": "BENZ",
        "img": benz,
        "name": "BENZ",
        "address": "0x9feAeF2C86ba783E1E2b0617f68dF96482e44DAF",
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




export default goerli