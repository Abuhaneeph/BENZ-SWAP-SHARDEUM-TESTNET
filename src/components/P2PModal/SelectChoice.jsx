import React, { useState,useContext } from 'react'
import {Select,Space } from 'antd'

import TokenList from '../../TokenList/tokenList';
import { DownOutlined } from '@ant-design/icons';
import { UserContext2 } from '../../../ContextProvider/ContextProvider2';

const SelectChoice= (props) => {
  const { Option } = Select;
const{handleChange}=useContext(UserContext2)
  

return (
    <Select
    placeholderStyle={{backgroundColor:"red"}}
    dropdownStyle={{ border: '1px solid #ccc' }}
    mode="multiple"
    style={{
      width: '100%',
      color:'Black Russian'
      
    }}
    placeholder="Select Token's of your Choice"
    
    onChange={handleChange}
    optionLabelProp="label"
  >
   {TokenList.map((item, index) => (
        <Option key={index} value={item.ticker} label={item.ticker}>
          <Space>
            <span role="img" aria-label={item.ticker} style={{fontWeight:"bold",fontSize:"13px"}}>
              {item.img && (
                <img
                  src={item.img}
                  alt={`${item.ticker} `}
                  style={{ width: '1em', height: '1em', marginRight: '0.2em' }}
                />
              )}
             {item.name} ({item.ticker.toUpperCase()})
            </span>
          </Space>
        </Option>
      ))}
   
  </Select>
  )
}

export default SelectChoice