import React ,{useState}from 'react'

import { Select } from 'antd'
import TokenList from '../../TokenList/tokenList'



const SelectList = ({Metadata}) => {
    const [tokenOne, setTokenOne] = useState(TokenList[0]);
   

   
  const onChange=(value)=>{
    console.log(value)
  }
 


     
      
  return (
    
 
      // Filter `option.label` match the user type `input`
      <>

     
        <Select
          mode='multiple'
          placeholder="Seller's Token Choices"
         
          onChange={onChange}
         
         
         style={{width:120}}
          options={Metadata.map((e, i) => ({
            optionSelectedBg: "#1A1C20 !important",
            optionActiveBg: "rgba(45, 0, 0, 0.25)",
            disabled: true,
            value: e.ticker,
            label:  <div>
            <img  src={e.img} alt="assetOneLogo" className="assetLogo" style={{marginRight:"5px"}} />
            
            {e.ticker}
           
          </div>
          }))}

           
        />
        </>
      );
      
  
}

export default SelectList