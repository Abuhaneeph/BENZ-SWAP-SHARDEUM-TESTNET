import React, { useState } from 'react'
import {Input } from "antd";
import './Liquidity.css'
import { PlusOutlined } from '@ant-design/icons';
import LiquidityAmount2Modal from './LiquidityAmount2Modal';
import LiquidityAmount1Modal from './LiquidityAmount1Modal';
import { useAddress } from '@thirdweb-dev/react';
import {Button} from 'antd';
const AddLiquidity = () => {
  const address = useAddress()
    const[amount1,setAmount1]=useState(null)
   
  return (
    <div>
        <div className="liquidityBox" style={{margin:"0 auto",marginTop:"40px"}}>
       
        <div className="inputs w3-margin-top"> 
          <Input
            placeholder="0"
            value={amount1}
            
            disabled
           
          />
           <Input
            placeholder="0"
            value={amount1}
            
            disabled
           
          />
          
         

          <div className="assetOnes"  >
      <LiquidityAmount1Modal/>
          </div>
          <div className="plusLiquid" >
            <PlusOutlined  className="switchArrow" />
          </div>

        <div className='assetTwo'>
             <LiquidityAmount2Modal/>
        </div>
          
          
        </div>
        
        <Button className="w3-border-0 faucetBtn w3-margin-bottom" disabled={!amount1 || !address } >Add Liquidity</Button>
      </div> 
    </div>
  )
}

export default AddLiquidity