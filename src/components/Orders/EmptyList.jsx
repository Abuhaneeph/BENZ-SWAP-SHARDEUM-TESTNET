import React from 'react'
import {Empty} from 'antd'
import './Empty.css'
const EmptyList = () => {
  return (
    <div className='w3-display-middle' style={{margin:"auto 0"}}>
        <Empty 
            description={
                <span className='w3-text-white' style={{fontSize:"20px",fontWeight:"bold"}}>
                

There are no ongoing or open trade orders that match the token you've chosen.
                </span>
              }
        /></div>
  )
}

export default EmptyList