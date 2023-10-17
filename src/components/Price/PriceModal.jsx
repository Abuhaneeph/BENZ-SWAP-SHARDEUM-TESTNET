import React from 'react'
import TokenList from '../../TokenList/tokenList';
import {Modal} from 'antd'
import { DownOutlined } from '@ant-design/icons';
const PriceModal = ({priceToken,IsOpenPriceModal,setOpenPriceModal, openPriceModal,setPriceToken}) => {
 
 
    function modifyPriceToken(i){
        setPriceToken(TokenList[i]);
        setOpenPriceModal(false);
      }
    return (
    <div>
        <Modal
        open={IsOpenPriceModal}
        footer={null}
        onCancel={() => setOpenPriceModal(false)}
        title="Select a token"
      
     
    
      >
        <div className="modalContent">
          {TokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyPriceToken(i)}
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
<div className=''  onClick={() => openPriceModal()}>
    <img src={priceToken.img} alt="assetOneLogo" className="assetLogo" style={{marginRight:"4px"}} />
   <span className='w3-text-white' style={{marginRight:"3px"}}>{priceToken.ticker}</span> 
    <DownOutlined className='w3-text-white'  />
  </div>
 </div> 
 
  )
}

export default PriceModal