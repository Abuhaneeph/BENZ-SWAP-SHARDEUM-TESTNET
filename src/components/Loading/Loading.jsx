import {React,useContext} from 'react'

import { MoonLoader } from 'react-spinners';
import { UserContext } from '../../../ContextProvider/ContextProvider';
const Loading = () => {
    
    
  const{loading}=useContext(UserContext)
    const override= {
        display: "block",
        margin: "0 auto",
       
      };

      
      
  return (
    <div className='w3-display-middle'>
        
     
       
       <MoonLoader
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader" 
       
       loading={loading} color="#36d7b7" />
      </div>
  )
}

export default Loading