import React from 'react'
import benzPng from '../../assets/benzpng.png'
import shardeum from '../../assets/shardeum.webp'
import TokensModal from '../TokensModal/TokensModal';
import ConnectBtn from '../ConnectBtn/ConnectBtn';
const TopBar = () => {
  return (
    <div >
       <>
  <div className="w3-top">
    <div className="w3-bar" >
    <img className="w3-left w3-margin-top w3-margin-bottom" src={benzPng} width={150}  height={40}/>
    <div className='w3-right w3-margin'>
    <ConnectBtn />
    </div>
   
    <img src={shardeum} width={90} height='auto' className='w3-right w3-hide-small  ' style={{marginTop:"30px",paddingRight:"18px"}} />
    <div className='w3-bar-item w3-right w3-hide-medium w3-hide-small ' style={{marginTop:"20px",paddingRight:"18px"}}>
   <TokensModal color='w3-text-white' />
  

   </div>
    <div className='w3-left' style={{marginLeft:"3px",marginTop:"18px"}}>
    <a href="/" className="w3-bar-item w3-button w3-hover-none w3-hover-text-white  w3-text-white  w3-hide-small w3-hide-medium" style={{textDecoration:"none",fontWeight:"bold"}}>Home</a>
    <a href="/p2p" className="w3-bar-item w3-button w3-hover-none w3-hover-text-white  w3-text-white  w3-hide-small w3-hide-medium" style={{textDecoration:"none",fontWeight:"bold"}}>P2P</a>
    <a href="/faucet" className="w3-bar-item w3-button w3-hover-none w3-hover-text-white  w3-text-white  w3-hide-small w3-hide-medium" style={{textDecoration:"none",fontWeight:"bold"}}>Faucet</a>
    <a href="/swap" className="w3-bar-item w3-button w3-hover-none w3-hover-text-white  w3-text-white  w3-hide-small w3-hide-medium" style={{textDecoration:"none",fontWeight:"bold"}}>Swap</a>
    <a href="/liquidity" className="w3-bar-item w3-button w3-hover-none w3-hover-text-white  w3-text-white  w3-hide-small w3-hide-medium" style={{textDecoration:"none",fontWeight:"bold"}}>Liquidity</a>
    <a href="/pool" className="w3-bar-item w3-button w3-hover-none w3-hover-text-white  w3-text-white  w3-hide-small w3-hide-medium" style={{textDecoration:"none",fontWeight:"bold"}}>Pools</a>

    
    </div>
   
      
    </div>
  </div>
  <br />
  <br />
  <br/>
</>

    </div>
  )
}

export default TopBar