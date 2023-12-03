import React,{useContext,useEffect,useRef, useState} from 'react'
import OrderList from '../../src/components/Orders/OrderList'
import TradeModal from '../../src/components/OrderModal/TradeModal'
import GetOrders from '../../src/components/Orders/GetOrders'
import { ContractInstances } from '../../ContextProvider/ContractInstanceProvider'
import { UserContext } from '../../ContextProvider/ContextProvider'
import { UserContext2 } from '../../ContextProvider/ContextProvider2'
import { findImgByAddress } from '../../utils/constants'
import { useTokenService } from '../../ContextProvider/TokensProvider'
import { ethers } from 'ethers'

const Home = () => {
  const{TokenList}=useTokenService()
  const{Token} =useContext(UserContext2)
  const{setOpenModal}=useContext(UserContext)
  
  useEffect(() => {
    getOrders()
     
    }, [Token])
   
  const CHOICE_TOKEN=Token.address;

  const ImgUrl= findImgByAddress(TokenList,CHOICE_TOKEN);

 const{ P2P_CONTRACT_INSTANCE}=useContext(ContractInstances)
  const {isFetchOrders}=useContext(UserContext)
  const[sellerInfo,setSellerInfo]=useState([])
  async function getOrders(){

    const CONTRACT_INSTANCE= await P2P_CONTRACT_INSTANCE();
    const getOrdersList = await CONTRACT_INSTANCE.getListingsOfMatchingUsers(CHOICE_TOKEN);
    const cleanedOrderList= getOrdersList.map((eachOrderList)=>({
    
     seller_id:    Number(eachOrderList.seller_id),            // Unique seller ID
      seller_address:  eachOrderList.seller_address,         // Address of the seller
     seller_token:    eachOrderList.seller_token,          // Token being sold
     amount:      ethers.utils.formatEther(eachOrderList.amount),             // Amount of tokens for sale
    // List of tokens the seller is interested in
     isSold:    eachOrderList.isSold,
      imageUrl:  ImgUrl,
      desired_tokens:  eachOrderList.seller_desired_tokens,
      timestamp:   eachOrderList.timestamp
   
    }))
   
    
    setSellerInfo(cleanedOrderList)
    }

    const onHandleClick=()=>{
                    
      setOpenModal(true)
    }

  return (
  <div > 

   

{isFetchOrders ? (
  <>
    <OrderList sellerLists={sellerInfo}  handleClick={onHandleClick} />
   
  </> 
) : (
  <GetOrders />
)}

    </div>
  )
}

export default Home