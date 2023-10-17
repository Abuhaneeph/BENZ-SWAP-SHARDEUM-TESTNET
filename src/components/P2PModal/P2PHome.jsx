import React, { useState,useContext } from 'react'
import {

  PlusOutlined,
  
} from "@ant-design/icons";
import {useAddress } from '@thirdweb-dev/react';
import { toast} from 'react-toastify';
import {Input, Popover, Button, List } from "antd";
import P2P from './P2P';
import { ethers } from 'ethers';
import { UserContext2 } from '../../../ContextProvider/ContextProvider2';
import TokenList from '../../TokenList/tokenList';
import SelectChoice from './SelectChoice';
import { P2P_ADDRESS } from '../../../const/Contract/Contract_Addresses';
import ToastMsg from './ToastMsg';
import { ContractInstances } from '../../../ContextProvider/ContractInstanceProvider';


const P2PHome = () => {
  const{TEST_TOKEN_CONTRACT_INSTANCE,P2P_CONTRACT_INSTANCE}=useContext(ContractInstances)
  const{peerToken,selectedValues} = useContext(UserContext2)

  const address = useAddress()
  const[TokenAmount,setTokenAmount]=useState(null)
   const[isCreating,setIsCreating] =useState(false)
   const[isApproving,setIsApproving]=useState(false)


// Initialize an array to store matching addresses
const matchingAddresses = [];

// Iterate through the TokenList
TokenList.forEach((token) => {
  // Check if the token's ticker exists in the firstArray
  if (selectedValues.includes(token.ticker)) {
    // Push the address to the matchingAddresses array
    matchingAddresses.push(token.address);
  }
});

const  getSellerID =async()=>{
  const P2P_CONTRACT=await P2P_CONTRACT_INSTANCE()
  const Seller_ID=await P2P_CONTRACT.ID();
  

   const seller_ID=Number(Seller_ID)
    
     
      const id=`Your Lisiting ID is ${seller_ID}`;
     
        toast.success(id, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      

   
}

const ApproveToken=async()=>{
  const TokenAmountInWei = ethers.utils.parseEther(TokenAmount);
 
   const TEST_TOKEN_CONTRACT= await TEST_TOKEN_CONTRACT_INSTANCE(peerToken.address);  
  const approveSpending =await TEST_TOKEN_CONTRACT.approve(P2P_ADDRESS,TokenAmountInWei);

  setIsApproving(true) 
  console.log(`Loading - ${approveSpending.hash}`);
       await approveSpending.wait();
       console.log(`Success - ${approveSpending.hash}`);
    setIsApproving(false)

}

const createListing=async()=>{

  // Specify the amount of Ether to send (in Wei)
const TokenAmountInWei = ethers.utils.parseEther(TokenAmount);
  
if(peerToken.address == TokenList[0].address){
  try{

 
         
    const P2P_CONTRACT=await P2P_CONTRACT_INSTANCE()
    
   


     const createListing =await P2P_CONTRACT.createTokenListing(TokenAmountInWei, peerToken.address, matchingAddresses, {
      value: TokenAmountInWei,
    });
     setIsCreating(true) 
     console.log(`Loading - ${createListing.hash}`);
          await createListing.wait();
          console.log(`Success - ${createListing.hash}`);
          setIsCreating(false);
          getSellerID();

 }catch(error){
  setIsCreating(false);
console.log(error)
}
}else{
  try{




      
    
    const P2P_CONTRACT=await P2P_CONTRACT_INSTANCE()
     const TOKEN_ADDRESS= peerToken.address;
     console.log(TOKEN_ADDRESS)

     
 
   
    
 const createListing =await P2P_CONTRACT.createTokenListing(TokenAmountInWei ,peerToken.address, matchingAddresses)
      
      console.log(`Loading - ${createListing.hash}`);
          setIsCreating(true)
                await createListing.wait();
                console.log(`Success - ${createListing.hash}`);
                setIsCreating(false);
                getSellerID();


       
      
 }catch(error){
  setIsCreating(false);
console.log(error)
} 

}



}

  return (
    <>
 
    <div className="peerBox w3-margin " style={{marginTop:"20px"}}>
        <div className="tradeBoxHeader">
          <h4 style={{color:"white",fontWeight:"bolder",fontSize:"18px"}}>Peer-2-Peer</h4>
          
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={TokenAmount}
            onChange={(e)=>{setTokenAmount(e.target.value)}}
           
          />
           <div className='choices '>
              
              <SelectChoice/>
           </div>
          <div className="switchButton" >
            <PlusOutlined  className="switchArrow" />
          </div>

          <div className="assetOnes"  >
          <P2P/>
          </div>
          
          
          
        </div>
        {peerToken.address != TokenList[0].address && <Button loading={isApproving ? true : false} className="swapButton w3-border-0" onClick={ApproveToken} disabled={!address || !TokenAmount || !peerToken || !selectedValues} >{isApproving ? 'Approving Token' : 'Approve'}</Button> }
      <Button style={{marginTop:"5px",marginBottom:"9px"}} className="swapButton w3-border-0" loading={isCreating ? true : false} onClick={createListing} disabled={!TokenAmount || !peerToken || !selectedValues || !address}>{isCreating ? 'Creating P2P Trade' : 'Create P2P Trade'}</Button> 
      
    

<ToastMsg/>
      </div> 
      
      </>
  
  )
}

export default P2PHome