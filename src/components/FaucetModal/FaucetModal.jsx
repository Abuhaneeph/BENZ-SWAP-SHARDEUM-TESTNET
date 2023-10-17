import React, { useState, useContext, useEffect} from 'react'
import Modal from 'antd/es/modal/Modal'
import {
 
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useContract,useContractRead,useContractWrite } from '@thirdweb-dev/react';
import FaucetList from '../../TokenList/faucetTokenList';
import { UserContext2 } from '../../../ContextProvider/ContextProvider2';

const FaucetModal = () => {


  
const{faucetToken,isFaucetModal,setOpenFaucetModal,modifyFaucet,openFaucetModal}=useContext(UserContext2)




return (
    <div> 
           
    <Modal
        open={isFaucetModal}
        footer={null}
        onCancel={() => setOpenFaucetModal(false)}
        title="Select a token"
      
     
    
      >
        <div className="modalContent">
          {FaucetList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyFaucet(i)}
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
<div className=''  onClick={() => openFaucetModal()}>
    <img src={faucetToken.img} alt="assetOneLogo" className="assetLogo" style={{marginRight:"4px"}} />
   <span className='w3-text-white' style={{marginRight:"3px"}}>{faucetToken.ticker}</span> 
    <DownOutlined className='w3-text-white'  />
  </div>
 </div>
 )  
         
    
  
}

export default FaucetModal