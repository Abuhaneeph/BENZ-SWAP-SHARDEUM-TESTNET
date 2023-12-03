import React, {useState,useContext}from 'react'
import PriceModal from './PriceModal'
import {Input,Button} from 'antd'
import { useTokenService } from '../../../ContextProvider/TokensProvider'
import { ContractInstances } from '../../../ContextProvider/ContractInstanceProvider'
const Price = () => {
  const {TokenList} = useTokenService()
    const{P2P_CONTRACT_INSTANCE} = useContext(ContractInstances)
    const [price,setPrice]=useState(null)
    const[isSettingPrice,setSettingPrice]=useState(false)
    const[priceToken,setPriceToken]= useState(TokenList[0])
const [IsOpenPriceModal,setOpenPriceModal]=useState(false)


   


      const openPriceModal=()=>{
        setOpenPriceModal(true)
      }
   
      const  setTokenPrice = async() =>{
        try{
          
           const P2P_CONTRACT=await P2P_CONTRACT_INSTANCE()
            const settingPrice =await P2P_CONTRACT.markTokenAsTradeable(priceToken.address,price);
            setSettingPrice(true) 
            console.log(`Loading - ${settingPrice.hash}`);
                 await settingPrice.wait();
                 console.log(`Success - ${settingPrice.hash}`);
                 setSettingPrice(false);
        }catch(error){
            setSettingPrice(false);
       console.log(error)
      }
       
     } 


  return (
    <div>
        <div className="faucetBox" style={{margin:"0 auto",marginTop:"40px"}}>
        <div className="tradeBoxHeader">
          <h4 style={{color:"white",fontWeight:"bolder",fontSize:"18px"}}>Set Price</h4>
         
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={price}
            
            onChange={(e)=>{setPrice(e.target.value)}}
           
          />
          
         

          <div className="assetOnes"  >
          <PriceModal setPriceToken={setPriceToken} priceToken={priceToken} IsOpenPriceModal={IsOpenPriceModal} setOpenPriceModal={setOpenPriceModal}  openPriceModal={openPriceModal}/>
          </div>

         
          
          
        </div>
        
        <Button loading={isSettingPrice ? true : false} onClick={setTokenPrice}  className="w3-border-0 faucetBtn" >{isSettingPrice ? 'Setting Token Price' : 'Set Token Price'}</Button>
      </div> 

    </div>
  )
}

export default Price