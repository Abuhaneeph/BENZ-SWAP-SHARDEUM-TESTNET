import TokenList from "../src/TokenList/tokenList";

export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export function findImgByAddress(address) {
    for (const token of TokenList) {
        if (token.address === address) {
            return token.img;
        }
    }
    return null; // Return null if no match is found
}


export function findTickerByAddress(address) {
  for (const token of TokenList) {
      if (token.address === address) {
          return token.ticker;
      }
  }
  return null; // Return null if no match is found
}

export function toWei(number){
   return number * 10 ** 18;
}

// Reusable function to get matched token data
export function getMatchedTokenData(tokenList, addresses) {
    // Filter TokenList to get tokens with matching addresses
    const matchedTokens = tokenList.filter((token) =>
      addresses.includes(token.address)
    );
  
    // Create a new array with ticker and img url for each matched token
    const matchedTokenData = matchedTokens.map((token) => ({
      ticker: token.ticker,
      img: token.img,
    }));
  
    return matchedTokenData;
  }
  



export async function addTokenToMetamask(tokenAddress, tokenSymbol, tokenDecimals, tokenImage) {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.error("Metamask is not detected or not installed.");
      return;
    }
  
    const params = {
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    };
  
    try {
      await window.ethereum.request(params);
      console.log(`Token ${tokenSymbol} added to Metamask successfully.`);
    } catch (error) {
      console.error(`Failed to add token to Metamask: ${error}`);
    }
  }
  

 export  function timeAgo(timestamp) {
    const now = new Date();
    const previousTime = new Date(timestamp * 1000); // Convert from Unix timestamp (seconds) to milliseconds
  
    const elapsed = now - previousTime;
  
    if (elapsed < 60000) {
      // Less than a minute, display in seconds
      return `${Math.floor(elapsed / 1000)} s `;
    } else if (elapsed < 3600000) {
      // Less than an hour, display in minutes
      return `${Math.floor(elapsed / 60000)} MINS `;
    } else {
      // An hour or more, display in hours
      return `${Math.floor(elapsed / 3600000)} HRS`;
    }
  }
  