import React,{useContext, useState,useEffect} from 'react'
import BuyCard from '../Buy/BuyCard'
import EmptyList from './EmptyList'
const OrderList = ({sellerLists,handleClick}) => {
  
  

  return (
<>


    
    <div className='w3-container' style={{marginBottom:"60px",marginTop:"20px"}}>
    <div className="w3-row-padding w3-margin-top">
    {sellerLists.length === 0 ? (
          <EmptyList/>
        ) : (

    
  sellerLists.map((seller) => (
    <div className="w3-col l4 m6 w3-margin-top" key={seller.seller_id}>
      <BuyCard timestamp={seller.timestamp}  sellerToken={seller.seller_token} id={seller.seller_id} address={seller.seller_address} amount={seller.amount}  img={seller.imageUrl} onAction={handleClick} desiredTokens={seller.desired_tokens}/>
    </div>
  ))

        )
     
}       
      </div>
   
     
      

      
      </div>

   
    </>
  )
}

export default OrderList
