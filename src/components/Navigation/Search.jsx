import React, { useState } from 'react'
import Modal from 'antd/es/modal/Modal';
import {DownOutlined } from 'antd/es/dropdown/dropdown';
import TokenList from '../../TokenList/tokenList';
const Search = () => {
const[isOpenTokensModal,setOpenTokensModel]=useState(false)
  return (
    <div>
           
    <Modal
        open={isOpenTokensModal}
        footer={null}
        onCancel={() => setOpenTokensModel(false)}
        title="Select a token"
      
     
    
      >
        <div className="modalContent">
          {TokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
<div className="w3-container assetOne w3-margin"  onClick={() => openModal(1)}>
    <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
<span className='w3-text-black' style={{fontWeight:"bold",fontSize:"15px"}}>{tokenOne.ticker}</span>
    <DownOutlined />
  </div>
  </div>
  )
}

export default Search