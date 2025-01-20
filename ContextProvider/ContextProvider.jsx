import React,{createContext, useState,useEffect} from 'react'
import { useTokenService } from './TokensProvider';
import { ethers } from 'ethers';
import { useSigner } from '@thirdweb-dev/react';
import { shortenAddress } from '../utils/constants';
import { useChainId,useAddress } from '@thirdweb-dev/react'; 
import goerli from '../src/TokenList/goerli';
import { G_P2P_ADDRESS , S_P2P_ADDRESS, Z_P2P_ADDRESS} from '../const/Contract/Contract_Addresses';
import { P2P_ABI } from '../const/ABI/P2P_ABI';
import zetachain from '../src/TokenList/zetachain';
import shardeum from '../src/TokenList/shardeum';


export const UserContext = createContext()

const ContextProvider = ({children}) => {
  const { TokenList: originalTokenList,setTokenList, setP2PAddress} = useTokenService();
  const{p2pAddress}=useTokenService()
  const chainId= useChainId()
  const signer = useSigner();
  const [isOpenModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(true);
  const [isFetchOrders, setFetchOrders] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLiquidity1, setOpenLiquidity1] = useState(false);
  const [Token1, setToken1] = useState(originalTokenList[0]);
  const address =useAddress()


  // Ensure TokenList has at least one item before accessing properties
  const Token1Index = Token1 ? Token1.key : undefined;

  const pairedPoolArrays = filterTokensByPool(Token1Index);
  const [Token2, setToken2] = useState(pairedPoolArrays.length > 0 ? pairedPoolArrays[0] : null);
  const [pairedToken2List, setPairedToken2List] = useState(pairedPoolArrays);
  const [isLiquidity2, setOpenLiquidity2] = useState(false);
  
  useEffect(() => {
    if(!address){
      setToken1(originalTokenList[0])
    }else{
    
      
      
      if (chainId === 8081) {
        setTokenList(shardeum);
        setP2PAddress(S_P2P_ADDRESS);
        
      } else if( chainId === 5) {
        setTokenList(goerli);
       
        setP2PAddress(G_P2P_ADDRESS);
     
      }else if(chainId === 7001){
      setTokenList(zetachain);
           setP2PAddress(Z_P2P_ADDRESS);
      }
      setToken1(originalTokenList[0]); // Set a default token or adjust as needed
      setToken2(pairedPoolArrays[0])
    }
   
      // Update token list when chainId changes
     
  
  }, [chainId, originalTokenList]);

  

     async function P2P_CONTRACT_INSTANCE (){

      const P2P_CONTRACT_INSTANCE =new ethers.Contract(p2pAddress, P2P_ABI , signer);
      return P2P_CONTRACT_INSTANCE;
    }


    function modifyLiquidty1(i){
        setToken1(originalTokenList[i]);
        
        const pairedPoolArrays=filterTokensByPool(i);
        setPairedToken2List(pairedPoolArrays)
        setToken2(pairedPoolArrays[0])
        
        setOpenLiquidity1(false);
      
      }


      const openLiquidityModal=()=>{
        setOpenLiquidity1(true)
      }
   
 
     
     
     function modifyLiquidty2(i){
          
      setToken2(pairedPoolArrays[i])
        //setToken2(pairedToken2List[i]);
        
        
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
      const soldOrders= await P2P_CONTRACT.SOLD_ORDERS();
      return [NoOfOrders,soldOrders];
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
      if (index >= 0 && index < originalTokenList.length) {
          const targetToken = originalTokenList[index];
          const targetPools = targetToken.pool;
  
          for (let i = 0; i < originalTokenList.length; i++) {
              if (targetPools.includes(originalTokenList[i].ticker) && originalTokenList[i].ticker !== targetToken.ticker) {
                  filteredArray.push(originalTokenList[i]);
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