import React,{createContext, useState} from 'react'
import TokenList from '../src/TokenList/tokenList';
import { P2P_ADDRESS } from '../const/Contract/Contract_Addresses';
import { P2P_ABI } from '../const/ABI/P2P_ABI';
import { ethers } from 'ethers';
import { useSigner } from '@thirdweb-dev/react';
import { shortenAddress } from '../utils/constants';
 

export const UserContext = createContext()

const ContextProvider = ({children}) => {
  const signer = useSigner()
    const [isOpenModal, setOpenModal] = useState(false); 
    let [loading, setLoading] = useState(true);
    const [isAddingLiquidity, setIsAddingLiquidity] = useState(true);
    const[isFetchOrders,setFetchOrders]=useState(false)
    const [openDrawer, setOpenDrawer] = useState(false);
    const[isLiquidity1,setOpenLiquidity1]=useState(false)
    const[Token1,setToken1]=useState(TokenList[0])
   

    const Token1Index=Token1.key;
     const pairedPoolArrays=filterTokensByPool(Token1Index);
    
     const[Token2,setToken2]=useState(pairedPoolArrays[0])
     const[pairedToken2List,setPairedToken2List]=useState(pairedPoolArrays)
     const[isLiquidity2,setOpenLiquidity2]=useState(false)
    
     async function P2P_CONTRACT_INSTANCE (){

      const P2P_CONTRACT_INSTANCE =new ethers.Contract(P2P_ADDRESS, P2P_ABI , signer);
      return P2P_CONTRACT_INSTANCE;
    }


    function modifyLiquidty1(i){
        setToken1(TokenList[i]);
        
        const pairedPoolArrays=filterTokensByPool(i);
        setPairedToken2List(pairedPoolArrays)
        setToken2(pairedPoolArrays[0])
        
        setOpenLiquidity1(false);
      
      }


      const openLiquidityModal=()=>{
        setOpenLiquidity1(true)
      }
   
 
     
     
     function modifyLiquidty2(i){
         setToken2(pairedPoolArrays[i]);
         setOpenLiquidity2(false);
       }
 
 
       const openLiquidityModal2=()=>{
         setOpenLiquidity2(true)
       }

       const closeLiquidityModal2 = () => {
       setOpenLiquidity2(false)
       }
   
    const showDrawer = () => {
      setOpenDrawer(true);
    };
    const onClose = () => {
      setOpenDrawer(false);
    };
    

    const getOrdersNumbers = async () => {
      const P2P_CONTRACT = await P2P_CONTRACT_INSTANCE();
      const NoOfOrders = await P2P_CONTRACT.getNumbersOfSellers();
      const soldOrders = await P2P_CONTRACT.SoldOrders();
      return [NoOfOrders, soldOrders];
    };
    

    const getEachSellerOrders=async()=>{
      const P2P_CONTRACT= await P2P_CONTRACT_INSTANCE();   
      const getOrdersList = await P2P_CONTRACT.getSellersOrders();
      const cleanedOrderList= getOrdersList.map((eachOrderList)=>({
   
       seller_id:    Number(eachOrderList.seller_id),            // Unique seller ID
        seller_address:  shortenAddress(eachOrderList.seller_address),         // Address of the seller
       seller_token:    eachOrderList.seller_token,          // Token being sold
       amount:      ethers.utils.formatEther(eachOrderList.amount),             // Amount of tokens for sale
      // List of tokens the seller is interested in
       isSold:    eachOrderList.isSold
       
    }))
   
      return cleanedOrderList
    }
     
    const fetchOrders=async()=>{
   
     // window.location.href = '/orders'
      setFetchOrders(true)
    }


    const handleAddLiquidityClick = () => {
      setIsAddingLiquidity(true);
    };
  
    const handleRemoveLiquidityClick = () => {
      setIsAddingLiquidity(false);
    };

    function filterTokensByPool(index) {
      const filteredArray = [];
      if (index >= 0 && index < TokenList.length) {
          const targetToken = TokenList[index];
          const targetPools = targetToken.pool;
  
          for (let i = 0; i < TokenList.length; i++) {
              if (targetPools.includes(TokenList[i].ticker) && TokenList[i].ticker !== targetToken.ticker) {
                  filteredArray.push(TokenList[i]);
              }
          }
  
          
          return filteredArray;
      } else {
          console.log("Invalid index.");
          return [];
      }
  }
  

  return (
    <UserContext.Provider value={{closeLiquidityModal2,getOrdersNumbers,getEachSellerOrders,pairedToken2List,modifyLiquidty2,openLiquidityModal2,isLiquidity2,Token2,isLiquidity1,setOpenLiquidity1,Token1,setToken1,modifyLiquidty1,openLiquidityModal,filterTokensByPool,openDrawer,showDrawer,onClose,isFetchOrders,setFetchOrders,fetchOrders,isOpenModal,setOpenModal,loading,setLoading,isAddingLiquidity,setIsAddingLiquidity,handleAddLiquidityClick,handleRemoveLiquidityClick}}>
        {children}
      </UserContext.Provider>

  )
}

export default ContextProvider