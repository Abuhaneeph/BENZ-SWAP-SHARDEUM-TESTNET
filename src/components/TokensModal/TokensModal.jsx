import React, { useContext,useEffect } from 'react'
import Modal from 'antd/es/modal/Modal';

  import {DownOutlined } from  "@ant-design/icons";
import { UserContext2 } from '../../../ContextProvider/ContextProvider2';
import { useTokenService } from '../../../ContextProvider/TokensProvider';

const TokensModal = ({color}) => {
  const {TokenList} = useTokenService()
  const{openTokenModal,modifyToken,isOpenTokensModal,setOpenTokensModal,Token}=useContext(UserContext2)
  
  


  
    return (
    <div> 
           
    <Modal
        open={isOpenTokensModal}
        footer={null}
        onCancel={() => setOpenTokensModal(false)}
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
                  <div className="tokenName ">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
<div className=''  onClick={() => openTokenModal()}>
    <img src={Token.img} alt="assetOneLogo" className="assetLogo" style={{marginRight:"4px"}} />
   <span className={color} style={{marginRight:"3px",fontWeight:"bold"}}>{Token.ticker}</span> 
    <DownOutlined className={color}  />
  </div>
  </div>
  )
}

export default TokensModal