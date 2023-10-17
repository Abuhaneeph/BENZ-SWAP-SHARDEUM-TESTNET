import React ,{useContext,useState}from 'react'
import Modal from 'antd/es/modal/Modal'
import {
  DownOutlined, 
} from "@ant-design/icons";
import TokenList from '../../TokenList/tokenList'
import { UserContext } from '../../../ContextProvider/ContextProvider';

const LiquidityAmount2Modal = () => {
    
    
    const{closeLiquidityModal2,Token2,isLiquidity2,openLiquidityModal2,modifyLiquidty2,pairedToken2List}=useContext(UserContext)
   
   
  return (
    <div> 
           
    <Modal
        open={isLiquidity2}
        footer={null}
        onCancel={() => closeLiquidityModal2()}
        title="Select a token"
      
     
    
      >
        <div className="modalContent">
          {pairedToken2List?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyLiquidty2(i)}
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
      {Token2 ? (
  <div className='' onClick={() => openLiquidityModal2()}>
    <img src={Token2.img} alt="assetOneLogo" className="assetLogo" style={{ marginRight: "4px" }} />
    <span className='w3-text-white' style={{ marginRight: "3px" }}>{Token2.ticker}</span>
    <DownOutlined className='w3-text-white' />
  </div>
) : (
  <span>Select a Pair</span>
)}

 </div>
  )
}

export default LiquidityAmount2Modal