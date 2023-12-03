import React,{useState,useContext} from 'react'
import {Input,Button} from 'antd'
import { ethers } from 'ethers'
import { P2P_ABI } from '../../../const/ABI/P2P_ABI'
import { useSigner } from '@thirdweb-dev/react'
import { ContractInstances } from '../../../ContextProvider/ContractInstanceProvider'
import { PRICEAPI_ADDRESS } from '../../../const/Contract/Contract_Addresses'

const CreatePair = () => {
  const[isLoadingPoolAddr,setLoadingPoolAddr]=useState(false)
  
   const{PRICEAPI_CONTRACT_INSTANCE}=useContext(ContractInstances)
 
   
 
  
    

    const[createPair,setCreatePair]=useState({
        Address: '',
        Price: 0,
      })

        
    function onChangeEvent(event) {
       
 
        const { name, value } = event.target;
    setCreatePair({
      ...createPair,
      [name]: value,
    });

       
      }
     const  createAddrPair = async() =>{
       try{
         const Address= [createPair.Address];
         const Price= [createPair.Price];
          const Price_API_CONTRACT=await PRICEAPI_CONTRACT_INSTANCE()
           const creatingPair =await Price_API_CONTRACT.markTokenAsTradeable(Address,Price);
           setLoadingPoolAddr(true) 
           console.log(`Loading - ${creatingPair.hash}`);
                await creatingPair.wait();
                console.log(`Success - ${creatingPair.hash}`);
                setLoadingPoolAddr(false);
       }catch(error){
        setLoadingPoolAddr(false);
      console.log(error)
     }
      
    }     
        
        return (
    <div>
          <div>
        <div className="faucetBox" style={{margin:"0 auto",marginTop:"15px"}}>
        <div className="tradeBoxHeader">
          <h4 style={{color:"white",fontWeight:"bolder",fontSize:"18px"}}>Create Pair</h4>

        </div>
        <div className="inputs">
          <Input
            name = "Address"
            placeholder="Pair Address"
            value={createPair.Address}
            onChange={onChangeEvent}
            
            
           
          />
          
          <Input
            name= "Price"
            placeholder="Price"
            value={createPair.Price}
            onChange={onChangeEvent}
            
            
           
          />
          

      
         
          
          
        </div>
        
        <Button  className="PoolBtn w3-border-0" loading={isLoadingPoolAddr? true : false} onClick={createAddrPair} disabled={!createPair.Address || !createPair.PairIndex}>{isLoadingPoolAddr ? 'Creating Pair' : 'Create Pair'}</Button>
      </div> 





    </div>


    </div>
  )
}

export default CreatePair