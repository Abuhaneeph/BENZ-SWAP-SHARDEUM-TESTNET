import React,{useContext} from 'react'
import AddLiquidity from './AddLiquidity'
import RemoveLiquidity from './RemoveLiquidity'
import LiquidityTab from './LiquidityTab'
import { UserContext } from '../../../ContextProvider/ContextProvider'
const Liquidity = () => {
    const{isAddingLiquidity}=useContext(UserContext)
  return (
    <div>

        <LiquidityTab/>
   {isAddingLiquidity ?  <AddLiquidity/> : <RemoveLiquidity/> }
    </div>
  )
}

export default Liquidity