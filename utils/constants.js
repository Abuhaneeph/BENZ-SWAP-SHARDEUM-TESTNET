
export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export function findImgByAddress(TokenList, address) {
    for (const token of TokenList) {
        if (token.address == address) {
            return token.img;
        }
    }
    return null; // Return null if no match is found
}

export function roundToTwoDecimalPlaces(number) {
  const roundedNumber = Math.round(number * 100000) / 100000;

  if (roundedNumber === Math.floor(roundedNumber)) {
    return roundedNumber.toFixed(0);
  } else {
    return roundedNumber.toFixed(5);
  }
}

export function roundToSevenDecimalPlaces(number) {
  const roundedNumber = Math.round(number * 10000000) / 10000000;

  if (roundedNumber === Math.floor(roundedNumber)) {
    return roundedNumber.toFixed(0);
  } else {
    return roundedNumber.toFixed(7);
  }
}



export function findTickerByAddress(TokenList, address) {
  const lowercaseAddress = address.toLowerCase();
  for (const token of TokenList) {
    if (token.address.toLowerCase() === lowercaseAddress) {
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
  // Convert all addresses to lowercase for case-insensitive comparison
  const lowercaseAddresses = addresses.map((address) => address.toLowerCase());

  // Filter TokenList to get tokens with matching addresses
  const matchedTokens = tokenList.filter((token) =>
    lowercaseAddresses.includes(token.address.toLowerCase())
  );

  // Create a new array with ticker and img url for each matched token
  const matchedTokenData = matchedTokens.map((token) => ({
    ticker: token.ticker,
    img: token.img,
  }));

  return matchedTokenData;
}

  

  const isUrl = (url) => {
    const regex = /(http(s)?:\/\/.)?(www\.)?([a-zA-Z0-9\-.]+)\.([a-zA-Z]{2,6})(\.[a-zA-Z]{2,6})?(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(url);
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
          image: isUrl(tokenImage) ? tokenImage : require(`src/assets/${tokenImage}`),
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

  export async function addBenzTokenToMetamask(tokenAddress, tokenSymbol, tokenDecimals) {
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
  

  export function timeAgo(timestamp) {
    const now = new Date();
    const previousTime = new Date(timestamp * 1000); // Convert from Unix timestamp (seconds) to milliseconds
    const elapsed = now - previousTime;
  
    if (elapsed < 60000) {
      // Less than a minute, display in seconds
      return `${Math.floor(elapsed / 1000)} s`;
    } else if (elapsed < 3600000) {
      // Less than an hour, display in minutes
      return `${Math.floor(elapsed / 60000)} mins`;
    } else if (elapsed < 86400000) {
      // Less than 24 hours, display in hours
      return `${Math.floor(elapsed / 3600000)} hrs`;
    } else {
      // 24 hours or more, display in days and remaining hours
      const days = Math.floor(elapsed / 86400000);
      const remainingHours = Math.floor((elapsed % 86400000) / 3600000);
      return `${days} days ${remainingHours} hrs`;
    }
  }
  