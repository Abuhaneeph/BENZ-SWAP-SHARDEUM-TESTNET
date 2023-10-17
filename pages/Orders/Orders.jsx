import React from 'react'
import OrderList from '../../src/components/Orders/OrderList'
import TradeModal from '../../src/components/OrderModal/TradeModal'
const Orders = () => {
  return (
    <div>
        <OrderList/>
        <TradeModal/>
    </div>
  )
}

export default Orders