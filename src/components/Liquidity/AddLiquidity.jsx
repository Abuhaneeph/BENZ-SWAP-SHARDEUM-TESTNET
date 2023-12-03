import React, { useEffect, useState, useContext } from 'react'; // Correct import statement
import { Input, Button, Spin } from 'antd';
import './Liquidity.css';
import { ethers } from 'ethers';
import { toast} from 'react-toastify';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import LiquidityAmount2Modal from './LiquidityAmount2Modal';
import LiquidityAmount1Modal from './LiquidityAmount1Modal';
import { useAddress } from '@thirdweb-dev/react';
import { ContractInstances } from '../../../ContextProvider/ContractInstanceProvider';
import { UserContext } from '../../../ContextProvider/ContextProvider';
import { useTokenService } from '../../../ContextProvider/TokensProvider';
import ToastIndex from './ToastIndex';
import { roundToTwoDecimalPlaces,roundToSevenDecimalPlaces } from '../../../utils/constants';
const AddLiquidity = () => {

  const {TokenList,swapAddress} = useTokenService()
  const { SWAP_CONTRACT_INSTANCE,TEST_TOKEN_CONTRACT_INSTANCE,fetchBalance} = useContext(ContractInstances);
  const { Token1, Token2 } = useContext(UserContext);

  const[isApprove1,setApprove1]=useState(false)
  const[isApprove2,setApprove2]=useState(false)

  const[hasApproveOne,setHasApprovedOne]=useState(false)
  const[hasApproveTwo,setHasApprovedTwo]=useState(false)

  const[Bal1,setBal1]=useState(null)
  const[Bal2,setBal2]= useState(null)
  const [isAddLiquid, setIsAddLiquid ] = useState(false); // Fix: Correct import and variable name
  const [isEstimate, setEstimate ]= useState(false); // Fix: Correct import and variable name
  const [amount2Rate,setAmount2Rate] = useState(''); // Fix: Correct variable name
  const address = useAddress();
  const [amount1, setAmount1] = useState(null);
  const [amount2, setAmount2] = useState(null);
  const[amount1inWei,setToWei]=useState(null)
  const[poolBal1,setPoolBal1]=useState(null)
  const[poolBal2,setPoolBal2] = useState(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      const SWAP_CONTRACT= await SWAP_CONTRACT_INSTANCE()
      const [poolBalance1,poolBalance2]= await SWAP_CONTRACT.getPoolSize(Token1.address,Token2.address)
      const s_poolBal1 = ethers.utils.formatEther(poolBalance1)
      const s_poolBal2 = ethers.utils.formatEther(poolBalance2)
      
     setPoolBal1(Number(roundToSevenDecimalPlaces(s_poolBal1)))
     setPoolBal2(Number(roundToSevenDecimalPlaces(s_poolBal2)))
    
      const bal1 = await fetchBalance(Token1.address);
      const bal2 = await fetchBalance(Token2.address);
      const roundedBal1 = roundToTwoDecimalPlaces(bal1)
      const roundedBal2 = roundToTwoDecimalPlaces(bal2)
      setBal1(roundedBal1)
      setBal2(roundedBal2)
    }catch(error){
     console.log(error)
    }
  }

  fetchData()
}, [Token1,Token2,address,poolBal1,poolBal2,isAddLiquid])


  const calculateAmount2 = async () => {
    if (amount1 !== null) {
      setEstimate(true);
      const SWAP_CONTRACT = await SWAP_CONTRACT_INSTANCE();
      const TokenAmountInWei = ethers.utils.parseEther(amount1);
      
      setToWei(TokenAmountInWei)
      try {
        const rate = await SWAP_CONTRACT.estimate(
          Token1.address,
          Token2.address,
          TokenAmountInWei
        );
        console.log(rate)
       
        setAmount2Rate(rate);
      
        const formattedRate = ethers.utils.formatEther(rate);
       
        setAmount2(Number(formattedRate));
      } catch (error) {
        console.error(error);
        setAmount2(null);
      } finally {
        setEstimate(false);
      }
    } else {
      // If amount1 is null, set amount2 to null
      setAmount2(null);
      setEstimate(false);
    }
  };

  useEffect(() => {
    calculateAmount2();
  }, [amount1, SWAP_CONTRACT_INSTANCE, Token1, Token2, setAmount2, setEstimate]);

  const estimate = (e) => {
    const newValue = e.target.value;
    setAmount1(newValue);


    if (newValue !== amount1) {
      calculateAmount2();
    }
  };

  // ... (Remaining code remains the same)
  const  getLiquidID =async(poolid,ticker1,ticker2)=>{
    const SWAP_CONTRACT=await SWAP_CONTRACT_INSTANCE()
    const LIQUID_ID=await SWAP_CONTRACT.liquidIndex(poolid);
    
  
     const xLIQUID_ID=Number(LIQUID_ID)
      
       
        const id=`Your Liquid ID for ${ticker1}/${ticker2} is ${xLIQUID_ID}`;
       
          toast.success(id, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        
  
     
  }
 

  const ApproveToken1=async()=>{
   
    try{
      const TEST_TOKEN_CONTRACT= await TEST_TOKEN_CONTRACT_INSTANCE(Token1.address);  
     const approveSpending =await TEST_TOKEN_CONTRACT.approve(swapAddress,amount1inWei); 
     console.log(`Loading - ${approveSpending.hash}`);
     setApprove1(true)
      await approveSpending.wait();
    console.log(`Success - ${approveSpending.hash}`);
    setApprove1(false)
    setHasApprovedOne(true)
    }catch(error){
     setApprove1(false)
     console.log(error)
    }
   }

  const ApproveToken2=async()=>{
   
   try{
     const TEST_TOKEN_CONTRACT= await TEST_TOKEN_CONTRACT_INSTANCE(Token2.address);  
    const approveSpending =await TEST_TOKEN_CONTRACT.approve(swapAddress,amount2Rate); 
    console.log(`Loading - ${approveSpending.hash}`);
    setApprove2(true)
     await approveSpending.wait();
   console.log(`Success - ${approveSpending.hash}`);
   setApprove2(false)
   setHasApprovedTwo(true)
   }catch(error){
    setApprove2(false)
    console.log(error)
   }
  }

  const AddLiquidity = async () => {
   
      const SWAP_CONTRACT = await SWAP_CONTRACT_INSTANCE();
      const POOL_ID = await SWAP_CONTRACT.findPool(Token1.address, Token2.address);
      console.log(POOL_ID)
      
      if(Number(POOL_ID) ==  0) return;

     if(Token1.address == TokenList[0].address ){
      try{    

const ADD_LIQUID=await SWAP_CONTRACT.provideLiquidity(POOL_ID, amount1inWei, {
          value: amount1inWei,
        });
       setIsAddLiquid(true) 

         
         console.log(`Loading - ${ADD_LIQUID.hash}`);
              await ADD_LIQUID.wait();
              console.log(`Success - ${ADD_LIQUID.hash}`);
              setIsAddLiquid(false);
             
              getLiquidID(POOL_ID,Token1.ticker,Token2.ticker);
              
     }catch(error){
      setIsAddLiquid(false);
    console.log(error)
    }    
     }else{
      try{
        const ADD_LIQUID=await SWAP_CONTRACT.provideLiquidity(POOL_ID, amount1inWei);
               setIsAddLiquid(true) 
        
                 
                 console.log(`Loading - ${ADD_LIQUID.hash}`);
                      await ADD_LIQUID.wait();
                      console.log(`Success - ${ADD_LIQUID.hash}`);
                      setIsAddLiquid(false);
                     
                      getLiquidID(POOL_ID,Token1.ticker,Token2.ticker);
                      
             }catch(error){
              setIsAddLiquid(false);
            console.log(error)
            }


     }
     
  
  };

  return (
    <div>
      <div className="liquidityBox" style={{ margin: '0 auto', marginTop: '10px' }}>
        <div className="inputs w3-margin-top">
        <Input
  placeholder="0"
  value={amount1}
  onChange={address ? estimate : null}
/>

          <Input
            placeholder="0"
            value={amount2 !== null ? amount2 : ''}
            disabled
          />
          <div className="assetOnes">
            <LiquidityAmount1Modal />
          </div>
          <div className="plusLiquid">
            {isEstimate ? (
              <Spin
                className="switchArrow"
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />
            ) : (
              <PlusOutlined />
            )}
          </div>

          {address && !isNaN(Bal1) && (
  <div className="assetSecond" style={{color: "#5f6783"}}>
    Bal: {Bal1} {Token1.ticker}
  </div>)}
  {address && !isNaN(Bal2) && (
  <div className="assetThird " style={{color: "#5f6783"}}>
    Bal: {Bal2} {Token2.ticker}
  </div>
)}

{address && 
         <div className="poolOne" >
            <p  style={{color: "#5f6783"}}>Pool Bal: {poolBal1} {Token1.ticker} </p>
</div>

}

{address &&
<div className="poolTwo" >
            <p  style={{color: "#5f6783"}}>Pool Bal: {poolBal2} {Token2.ticker} </p>
</div>
}
        
          <div className="assetTwo">
            <LiquidityAmount2Modal />
          </div>
        </div>
  

{!hasApproveOne && Token1.address !== TokenList[0].address  && (
  <Button
    loading={isApprove1}
    onClick={ApproveToken1}
    className="w3-border-0 faucetBtn"
    disabled={!amount1 || !address}
  >
    {isApprove1 ? 'Approving Token One' : 'Approve Token One'}
  </Button>
)}

{!hasApproveTwo && Token2.address != TokenList[0].address  && (
  <Button
    loading={isApprove2}
    onClick={ApproveToken2}
    className="w3-border-0 faucetBtn"
    disabled={!amount1 || !address}
  >
    {isApprove2 ? 'Approving Token Two' : 'Approve Token Two'}
  </Button>
)}


        <Button
        loading={isAddLiquid ? true : false}
          onClick={AddLiquidity}
          className="w3-border-0 faucetBtn  "
          style={{marginBottom:"13px"}}
          disabled={!amount1 || !address}
        >
         {isAddLiquid ? 'Adding Liquidity' : 'Add Liquidity'}
        </Button>
<ToastIndex/>
      </div>
    </div>
  );
};

export default AddLiquidity;
