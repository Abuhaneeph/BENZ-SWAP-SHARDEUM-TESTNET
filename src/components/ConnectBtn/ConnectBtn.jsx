import React from 'react'
import { ConnectWallet } from '@thirdweb-dev/react'
import benzPng from '../../assets/benzpng.png'
const ConnectBtn = () => {
  return (
    <ConnectWallet          switchToActiveChain={true}   width={50}  style={{fontWeight:"bold"}} welcomeScreen={{
        title:      <img className="w3-left w3-margin-top w3-margin-bottom" src={benzPng} width={150}  height={40}/>,
        subtitle: <p className='w3-text-white'>All inclusive Automated Market Maker & Decentralized exchange.</p>}}
        />
  )
}

export default ConnectBtn