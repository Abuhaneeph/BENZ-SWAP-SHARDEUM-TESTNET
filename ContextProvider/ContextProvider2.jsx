import React,{createContext, useState} from 'react'
import TokenList from '../src/TokenList/tokenList';
import FaucetList from '../src/TokenList/faucetTokenList';

export const UserContext2 = createContext()

const ContextProvider2 = ({children}) => {

  

    const[isHandleCreatePool,setHandleCreatePool]=useState(true)
    const[isFaucetModal,setOpenFaucetModal]=useState(false)
    const[faucetToken,setFaucetToken]=useState(FaucetList[0])
  
    const[selectedValues,setSelectedValues]=useState([])
    const[isP2PModal,setOpenP2PModal]=useState(false)
    const[peerToken,setPeerToken]=useState(TokenList[0])
   
    const[isOpenTokensModal,setOpenTokensModal]=useState(false)
    const[Token,setToken]=useState(TokenList[0])
   
   const openTokenModal=()=>{
     setOpenTokensModal(true)
   }
   
   function modifyToken(i){
     setToken(TokenList[i]);
     setOpenTokensModal(false);
   }
    
    
    
    
    function modifyP2P(i){
        setPeerToken(TokenList[i]);
        setOpenP2PModal(false);
      }


      const openP2PModal=()=>{
        setOpenP2PModal(true)
      }
    
    
    
    const handleChange = (values) => {
    
     setSelectedValues(values);
     
   };
    function modifyFaucet(i){
        setFaucetToken(FaucetList[i]);
        setOpenFaucetModal(false);
      }


      const openFaucetModal=()=>{
        setOpenFaucetModal(true)
      }
    const handleCreatePoolClick = () => {
        setHandleCreatePool(true);
      };
    
      const handleRemoveCreatePoolClick = () => {
        setHandleCreatePool(false);
      };
  return (
   <UserContext2.Provider value={{modifyToken,openTokenModal,Token,setToken,isOpenTokensModal,setOpenTokensModal,openP2PModal,modifyP2P,peerToken,setPeerToken,isP2PModal,setOpenP2PModal,handleChange,selectedValues,setSelectedValues,faucetToken,setFaucetToken,isFaucetModal,openFaucetModal,setOpenFaucetModal,modifyFaucet,handleCreatePoolClick,handleRemoveCreatePoolClick,isHandleCreatePool,setHandleCreatePool,}}>
{children}
   </UserContext2.Provider>
  )
}

export default ContextProvider2