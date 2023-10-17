import React,{useContext} from 'react'
import { UserContext2 } from '../../../ContextProvider/ContextProvider2'
const PoolTab = () => {
    const{handleCreatePoolClick,handleRemoveCreatePoolClick}=useContext(UserContext2)
    return (
      <div className='w3-center'>
      <div className="w3-bar w3-center w3-border-0" style={{width:"auto",borderRadius:"40px",background:"#1A1C20",marginTop:"30px"}}>
     <div onClick={handleCreatePoolClick} className="w3-bar-item w3-bold   w3-text-white w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
        Create Pool
      </div>
      <div onClick={handleRemoveCreatePoolClick}  className="w3-bar-item w3-gray  w3-text-white  w3-button" style={{textDecoration:"none",fontWeight:"bold"}}>
        Create Pair
      </div>
       
       </div>
       </div>
  )
}

export default PoolTab