import React ,{useState,useContext}from 'react'
import Modal from 'antd/es/modal/Modal'
import {
 
  DownOutlined,
  
} from "@ant-design/icons";
import TokenList from '../../TokenList/tokenList'
import { UserContext } from '../../../ContextProvider/ContextProvider';
const LiquidityAmount1Modal = () => {
    const{isLiquidity1,setOpenLiquidity1,modifyLiquidty1,openLiquidityModal,Token1}=useContext(UserContext)
  return (
    <div> 
           
    <Modal
        open={isLiquidity1}
        footer={null}
        onCancel={() => setOpenLiquidity1(false)}
        title="Select a token"
      
     
    
      >
        <div className="modalContent">
          
          {TokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
               
                onClick={() => modifyLiquidty1(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName ">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
<div className=''  onClick={() => openLiquidityModal()}>
    <img src={Token1.img} alt="assetOneLogo" className="assetLogo" style={{marginRight:"4px"}} />
   <span className='w3-text-white' style={{marginRight:"3px"}}>{Token1.ticker}</span> 
    <DownOutlined className='w3-text-white'  />
  </div>
 </div>
  )
}

export default LiquidityAmount1Modal