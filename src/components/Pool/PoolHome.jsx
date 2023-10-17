import React,{useContext} from 'react'

import CreatePool from './createPool'
import Price from '../Price/Price'
import PoolTab from './PoolTab'
import { UserContext2 } from '../../../ContextProvider/ContextProvider2'
const PoolHome = () => {
    const{isHandleCreatePool}=useContext(UserContext2)
  return (
    <div className='w3-display-middle'>
         <PoolTab/>
   {isHandleCreatePool?  <CreatePool/> : <Price/> }
    </div>
  )
}

export default PoolHome