import React,{useContext} from 'react'
import TokensModal from '../TokensModal/TokensModal'
import shardeum from '../../assets/shardeum.webp'
import { EllipsisOutlined } from '@ant-design/icons'
import BottomDrawer from './BottomDrawer'

import { UserContext } from '../../../ContextProvider/ContextProvider'
const BottomBar = () => {
   const{showDrawer} =useContext(UserContext)
  return (
    
    <div className='w3-center'>
    <div className="w3-bottom w3-block w3-hide-large" >
   
  <div className="w3-bar w3-block" style={{borderRadius:"40px",background:"white"}}>
    
    <div >
    <a href="/" className="w3-bar-item w3-bold  w3-text-black w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
      Home
    </a>
    <a href="/p2p" className="w3-bar-item  w3-text-white w3-text-black w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
      P2P
    </a>
    
    <a href="/swap" className="w3-bar-item    w3-text-black  w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
      Swap
    </a>
    
    <a href="/pool" className="w3-bar-item w3-text-black  w3-hide-small  w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
     Pools
    </a>
   
    <a href="/faucet" className="w3-bar-item w3-hide-small     w3-text-black  w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
      Faucet
    </a>
    <a href="/liquidity" className="w3-bar-item w3-hide-small    w3-text-black  w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
      Liquidity
    </a>
    <div className="w3-hide-medium  w3-right ">
      <EllipsisOutlined onClick={showDrawer}  className=' w3-margin-right w3-text-black' style={{color:"white",marginTop:"5px",fontSize:"25px",fontWeight:"bold"}}/>
    <BottomDrawer/>
    </div>

    <img src={shardeum} width={90} className='w3-right w3-hide-small w3-hide-medium' style={{marginTop:"10px",paddingRight:"18px"}} />
   <div className='w3-bar-item  w3-right  '>
   <TokensModal color='w3-text-black' />
   </div>
  
  
   </div>
   </div>
    
   
   
  
  </div>
</div>

  )
}

export default BottomBar