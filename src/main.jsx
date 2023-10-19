
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ContextProvider from '../ContextProvider/ContextProvider.jsx'
import ContextProvider2 from '../ContextProvider/ContextProvider2.jsx'
import { ThirdwebSDKProvider,ThirdwebProvider } from "@thirdweb-dev/react";
import ContractInstanceProvider from '../ContextProvider/ContractInstanceProvider.jsx'
import { ethers } from 'ethers'
import "./index.css"
import { ShardeumSphinxDapp1X } from "@thirdweb-dev/chains";

// Check if MetaMask is installed
const isMetaMaskInstalled = typeof window.ethereum !== 'undefined';

ReactDOM.createRoot(document.getElementById('root')).render(
 
 
    
      <ThirdwebSDKProvider activeChain={ShardeumSphinxDapp1X}   clientId={import.meta.env.VITE_CLIENT_ID} signer={isMetaMaskInstalled ? new ethers.providers.Web3Provider(window.ethereum).getSigner() : null}>
  <ThirdwebProvider 
  activeChain={ShardeumSphinxDapp1X}
  >
     <ContractInstanceProvider>
    <ContextProvider2>
  <ContextProvider>
 
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ContextProvider>
  </ContextProvider2>
  </ContractInstanceProvider>
  </ThirdwebProvider>
  </ThirdwebSDKProvider>
 

  
  
)
