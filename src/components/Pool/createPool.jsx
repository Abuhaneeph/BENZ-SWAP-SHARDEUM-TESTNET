import React, { useState,useContext } from 'react'
import './Pool.css'
import {Input} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ContractInstances } from '../../../ContextProvider/ContractInstanceProvider'
const CreatePool = () => {
const{SWAP_CONTRACT_INSTANCE}=useContext(ContractInstances)
const[isCreatePool,setCreatePool]=useState(false)
  const CREATE_POOL= async() =>{
    try{
   
       const SWAP_CONTRACT=await SWAP_CONTRACT_INSTANCE()
        const creatingPool =await SWAP_CONTRACT.createPool(poolAddress.poolAddress1,poolAddress.poolAddress2);
        setCreatePool(true) 
        console.log(`Loading - ${creatingPool.hash}`);
             await creatingPool.wait();
             console.log(`Success - ${creatingPool.hash}`);
             setCreatePool(false);
    }catch(error){
     setCreatePool(false);
   console.log(error)
  }

  }

    const[poolAddress,setPoolAddress]=useState({
      poolAddress1: '',
      poolAddress2: '',
    })
  
    function changeAddress(event) {
       
 
        const { name, value } = event.target;
    setPoolAddress({
      ...poolAddress,
      [name]: value,
    });

       
      }
  
  
    return (
    <div>
        <div className="faucetBox" style={{marginTop:"15px"}}>
        <div className="tradeBoxHeader">
          <h4 style={{color:"white",fontWeight:"bolder",fontSize:"18px"}}>Create Pool</h4>

        </div>
        <div className="inputs">
          <Input
            name = "poolAddress1"
            placeholder="Pool Address 1"
            value={poolAddress.poolAddress1}
            onChange={changeAddress}
            
            
           
          />
          
          
          <Input
            name= "poolAddress2"
            placeholder="Pool Address 2"
            value={poolAddress.poolAddress2}
            onChange={changeAddress}
            
            
           
          />
          

          <div className="switchPoolBtn" >
            <PlusOutlined  className="switchArrow" />
          </div>
         
          
          
        </div>
        
        <button onClick={CREATE_POOL} loading={isCreatePool ? true : false}  className="PoolBtn w3-border-0" disabled={!poolAddress.poolAddress1 || !poolAddress.poolAddress2}>{isCreatePool ? 'Creating Pool' : 'Create Pool'}</button>
      </div> 





    </div>
  )
}

export default CreatePool