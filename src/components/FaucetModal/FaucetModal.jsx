import React, { useContext} from 'react'
import Modal from 'antd/es/modal/Modal'


import {
 
  DownOutlined
} from "@ant-design/icons";


import { useTokenService } from '../../../ContextProvider/TokensProvider';
import { UserContext2 } from '../../../ContextProvider/ContextProvider2';

const FaucetModal = () => {

  const {TokenList} = useTokenService()
  
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
       {TokenList.slice(1).map((e, i) => {
  return (
    <div
      className="tokenChoice"
      key={i + 1}
      onClick={() => modifyFaucet(i + 1)}
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
<div className=''  onClick={() => openFaucetModal()}>
    <img src={faucetToken.img} alt="assetOneLogo" className="assetLogo" style={{marginRight:"4px"}} />
   <span className='w3-text-white' style={{marginRight:"3px"}}>{faucetToken.ticker}</span> 
    <DownOutlined className='w3-text-white'  />
  </div>
 </div>
 )  
         
    
  
}

export default FaucetModal