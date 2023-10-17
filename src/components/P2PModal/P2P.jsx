import React, { useState,useContext } from 'react'
import Modal from 'antd/es/modal/Modal'
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import TokenList from '../../TokenList/tokenList'
import { UserContext2 } from '../../../ContextProvider/ContextProvider2';
const P2P = () => {
  const{modifyP2P,peerToken,openP2PModal,isP2PModal,setOpenP2PModal}=useContext(UserContext2)
  return (
    <div> 
           
    <Modal
        open={isP2PModal}
        footer={null}
        onCancel={() => setOpenP2PModal(false)}
        title="Select a token"
      
     
    
      >
        <div className="modalContent">
          {TokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyP2P(i)}
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
<div className=''  onClick={() => openP2PModal(1)}>
    <img src={peerToken.img} alt="assetOneLogo" className="assetLogo" style={{marginRight:"4px"}} />
   <span className='w3-text-white' style={{marginRight:"3px"}}>{peerToken.ticker}</span> 
    <DownOutlined className='w3-text-white'  />
  </div>
 </div>
 )  
         
    
  
}

export default P2P