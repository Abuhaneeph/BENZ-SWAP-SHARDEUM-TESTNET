import React,{useContext} from 'react'
import { Drawer,Divider } from 'antd'
import benzPng from '../../assets/benzpng.png'
import shardeum from '../../assets/shardeum.webp'
import { UserContext } from '../../../ContextProvider/ContextProvider'
const BottomDrawer = () => {
const{openDrawer,onClose}=useContext(UserContext)

const titleText=(

 <img  className="w3-left w3-display-top-middle w3-margin-top w3-margin-bottom" src={benzPng} width={150}  height={40}/>
  

)
  return (
    <div>
     <Drawer  style={{background: "rgb(25,33,52)"}} title={titleText}  size='small' placement="right" onClose={onClose} open={openDrawer}>
     <div className=''>

     <a href="/pool" className="w3-text-white w3-hover-none w3-hover-text-none    w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
     Pools
    </a>
     </div>
     <Divider className='w3-white'/>
   <div className=''> 
   <a href="/faucet" className="w3-hover-none w3-hover-text-none w3-text-white      w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
     Faucet
    </a>
  
   </div>
   <Divider className='w3-white'/>
   <div className=''> 
   <a href="/liquidity" className="w3-hover-none w3-hover-text-none w3-text-white      w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
     Liquidity
    </a>
  
   </div>



  
   <Divider className='w3-white'/>   
   <img src={shardeum} alt='no' width={100} height='auto' className='w3-display-bottommiddle' />  
      </Drawer>
    
    </div>
  )
}

export default BottomDrawer