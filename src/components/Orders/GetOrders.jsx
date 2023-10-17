import React,{useContext} from 'react'
import { useAddress,ConnectWallet } from '@thirdweb-dev/react'
import { UserContext } from '../../../ContextProvider/ContextProvider'
import ConnectBtn from '../ConnectBtn/ConnectBtn'
import { SVG,onFetchText,onConnectText } from './Data'
const GetOrders = () => {
  const{fetchOrders}=useContext(UserContext)
  const address=useAddress()

 


  return (
    <div >
        
        <h1 className=' w3-container w3-text-white' style={{marginTop:"40px",fontFamily: 'Basel,sans-serif',fontSize:'36px',fontWeight:'485'}} >
           Orders
        </h1>
        <div className=' w3-margin-left w3-margin-right w3-panel w3-round-large' style={{height:"auto",borderColor:"#243056",background:'#21273a'}}>
        <div className='w3-center'>
        {SVG}
    {address ?  onFetchText  : onConnectText }   
      {address ?
      <button className='w3-round-large w3-bold w3-margin w3-border-0 w3-padding w3-white' style={{ fontSize: "18px",fontWeight:"bold" }}  onClick={fetchOrders}>Fetch Orders</button>
      :
      <div className='w3-center w3-margin'  >
            <ConnectBtn
      style={{ fontSize: "18px" }}
      theme="light"
    />
      </div>
  
    }
      </div>
       
  
        
        </div>
    </div>
  )
}

export default GetOrders