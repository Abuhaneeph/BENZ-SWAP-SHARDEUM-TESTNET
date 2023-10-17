import React, {useContext,useEffect, useState} from 'react'
import { UserContext } from '../../../ContextProvider/ContextProvider';
import TradeModal from '../OrderModal/TradeModal';
import TokenList from '../../TokenList/tokenList';
import { shortenAddress } from '../../../utils/constants';
import { findTickerByAddress } from '../../../utils/constants';
import { getMatchedTokenData } from '../../../utils/constants';
import { timeAgo } from '../../../utils/constants';

const BuyCard = ({timestamp,id,amount,address,img,onAction,desiredTokens,sellerToken}) => {

      const{getOrdersNumbers}= useContext(UserContext)
      const[ordersNo,setOrdersNo]=useState(0)
      const[soldOrdersNo,setSoldOrdersNo]=useState(0)
      const Numbers = 0;

      useEffect(() => {

        async function getListNo(){
          const [NoOfOrders,NoOfSoldOrders] = await getOrdersNumbers();
          
            setOrdersNo(Number(NoOfOrders))
            setSoldOrdersNo(Number(NoOfSoldOrders))
}
    getListNo()
        }
      , [])
      


    
  const matchedMetadata= getMatchedTokenData(TokenList,desiredTokens)

return (
    <div style={{ background: '#1E1D2F', borderRadius: 14}} className='w3-margin-left' >
          <div
  className=" w3-right w3-padding-32  w3-circle   w3-center w3-margin-top w3-margin-right"
  style={{ width: "35%",border:"3px white solid"}}
>
  <p className="w3-text-white" style={{color: 'white', fontSize: 20, fontFamily: 'Rubik', fontWeight: '400', wordWrap: 'break-word'}}>
    {timeAgo(timestamp)}
    <br />
    
  </p>
</div>
      <div className='w3-container  w3-left'    style={{paddingTop:'30px', color: 'white', fontSize: 18, fontFamily: 'Rubik', fontWeight: '500', wordWrap: 'break-word'}}>{shortenAddress(address)}</div>
      <div className='w3-container w3-left' style={{color: 'white', fontSize: 15, fontFamily: 'Rubik', fontWeight: '300', wordWrap: 'break-word'}}>{ordersNo} orders | {soldOrdersNo} Completed</div>
      
       <div className='w3-container'>
       <div className='w3-left' style={{ color: 'white', fontSize: 28, fontFamily: 'Rubik', fontWeight: '500', wordWrap: 'break-word'}}>{amount} <img src={img}  style={{height:"2.5rem",width:"3rem"}}></img> </div>
       </div>
    
     
      <div className='w3-container w3-left' style={{paddingTop:'9px',paddingBottom:'30px', color: 'white', fontSize: 16, fontFamily: 'Rubik', fontWeight: '300', wordWrap: 'break-word'}}>Seller ID:  <span className='w3-margin' style={{color: 'white', fontSize: 16, fontFamily: 'Rubik', fontWeight: '400', wordWrap: 'break-word'}}>{id}</span>  </div>
      <div className='w3-container w3-right' style={{paddingTop:'9px',paddingBottom:'30px', color: 'white', fontSize: 16, fontFamily: 'Rubik', fontWeight: '300', wordWrap: 'break-word'}}>Token:  <span className='w3-margin' style={{color: 'white', fontSize: 16, fontFamily: 'Rubik', fontWeight: '400', wordWrap: 'break-word'}}>{findTickerByAddress(sellerToken)}</span>  </div>
      <div className='w3-container w3-center  w3-block' >
      <button onClick={onAction}  style={{background: '#BFBFBF',borderRadius:"7px"}} className='w3-btn w3-block w3-margin-bottom'><span style={{fontFamily:'Rubik',color:"white",fontSize:'20px',fontWeight:'400px',wordWrap: 'break-word'}}  >Buy</span></button>
      </div>
 
      <TradeModal id={id} sellerToken={sellerToken} amount={amount} Metadata={matchedMetadata}  />
    </div>
  )
}

export default BuyCard