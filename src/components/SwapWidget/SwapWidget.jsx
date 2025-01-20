import React, { useState, useEffect,useContext } from "react";
import { Input, Popover, Spin, Radio, Modal, Button, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { ethers } from "ethers";
import { useTokenService } from "../../../ContextProvider/TokensProvider";
import { ContractInstances } from "../../../ContextProvider/ContractInstanceProvider";
import { useChainId,useAddress } from "@thirdweb-dev/react";
import goerli from "../../TokenList/goerli";
import zetachain from "../../TokenList/zetachain";
import shardeum from '../../TokenList/shardeum';
import { roundToTwoDecimalPlaces } from "../../../utils/constants";


const SwapWidget = () => {
  const address =useAddress()
  const {TokenList,setTokenList,swapAddress} = useTokenService()
   const{SWAP_CONTRACT_INSTANCE,TEST_TOKEN_CONTRACT_INSTANCE,PRICEAPI_CONTRACT_INSTANCE,fetchBalance}=useContext(ContractInstances)
  const [slippage, setSlippage] = useState(2.5);
  const [token1Amount, setToken1Amount] = useState(null);
  const [token2Amount, setToken2Amount] = useState(null);
  const [token1, setToken1] = useState(TokenList[0]);
  const [token2, setToken2] = useState(TokenList[1]);
  const[isApproveOne,setApproveOne]=useState(false)
  
  const [hasApprovedOne,setHasApprovedOne]= useState(false)
  const[isSwapping,setSwapping]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [AmountOneInWei,setAmountOneInWei]=useState('')
  const [AmountTwoRate,setAmountTwoRate]=useState('')
  const [changeToken, setChangeToken] = useState(1);
  const[Bal1,setBal1] = useState(0)
  const[Bal2,setBal2] = useState(0)
  const[dollarRate,setDollarRate]= useState(null)
  const[baseTwoRate,setBaseTwoRate]=useState(null)
  const[isEstimateAmount2,setEstimatedAmount2]=useState(false)
const chainId = useChainId()

useEffect(() => {
  
   if(chainId === 8081){
       setTokenList(shardeum);
   }else if(chainId === 5){
    setTokenList(goerli);

   }else if(chainId === 7001){
     setTokenList(zetachain);
   }



}, [chainId, TokenList]);


useEffect(()=>{
  const fetchData = async () => {
    try {
      
      const bal1 = await fetchBalance(token1.address);
      const bal2 = await fetchBalance(token2.address);
      const roundedBal1 = roundToTwoDecimalPlaces(bal1)
      const roundedBal2 = roundToTwoDecimalPlaces(bal2)
    
      
      setBal1(roundedBal1)
      setBal2(roundedBal2)
      const PRICE_CONTRACT= await PRICEAPI_CONTRACT_INSTANCE();
    
  
      
      const dollarRate= await PRICE_CONTRACT.getTokenPrice(token1.address);
    
      const formattedDollarRate= ethers.utils.formatEther(dollarRate)
    
      setDollarRate(formattedDollarRate)

    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

},[token1,token2,address,Bal1,Bal2,dollarRate,setDollarRate,chainId,PRICEAPI_CONTRACT_INSTANCE])

  
  const calculateAmount2 = async () => {
    if (token1Amount !== null) {
      setEstimatedAmount2(true);
      const PRICE_CONTRACT = await PRICEAPI_CONTRACT_INSTANCE();
      
      const TokenAmountInWei = ethers.utils.parseEther(token1Amount);

      
     
      try {
        const rate = await PRICE_CONTRACT.estimate(
          token1.address,
          token2.address,
          TokenAmountInWei
         
        );
      
        const f_rate=ethers.utils.formatEther(rate)

        const swapFee= ((20/1000 * f_rate))
      

        const amountTwoToReceive = f_rate - swapFee
       
        
        setToken2Amount(Number(amountTwoToReceive));
        setAmountOneInWei(TokenAmountInWei);
        ///======  ESTIMATING TWO TO ONE =====//
        
        const Amount2InWei= ethers.utils.parseEther("1");
        const rateToExchangeTwotoOne= await PRICE_CONTRACT.estimate(
          token2.address,
          token1.address,
          Amount2InWei

        )
        const formattedTwoRate = ethers.utils.formatEther(rateToExchangeTwotoOne);

        setBaseTwoRate(formattedTwoRate)
        
        setAmountTwoRate(rateToExchangeTwotoOne);
        
       
       
       
        
       
        

      } catch (error) {
        console.error(error);
        setToken2Amount(null);
      } finally {
        setEstimatedAmount2(false);
      }
    } else {
      // If amount1 is null, set amount2 to null
      setToken2Amount(null);
      setEstimatedAmount2(false);
    }
  };
  
  useEffect(() => {
    calculateAmount2();
  }, [SWAP_CONTRACT_INSTANCE,PRICEAPI_CONTRACT_INSTANCE,token1Amount,token1, token2,baseTwoRate,setAmountOneInWei,setBaseTwoRate,setToken2Amount, setAmountTwoRate, setEstimatedAmount2,chainId]);
  
  const estimate = (e) => {
    const newValue = e.target.value;
    setToken1Amount(newValue);
  
  
    if (newValue !== token1Amount) {
      calculateAmount2();
    }
  };
  
  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
    
  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }


  function switchTokens() {
   
    setToken1Amount(null);
    setToken2Amount(null);
    const one = token1;
    const two = token2;
     // Check if the tokens are different before switching
 
    setToken1(two);
    setToken2(one);
 
  
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i) {
    setToken1Amount(null);
    setToken2Amount(null);
  
    const selectedToken = TokenList[i];
  
    if (changeToken === 1) {
      // Ensure token1 address is different from token2 address
      if (selectedToken.address !== token2.address) {
        setToken1(selectedToken);
      } else {
        // Handle the case where the selected token has the same address as token2
        // You can show an error message, or handle it in any way suitable for your application
        console.error("Token1 and Token2 cannot have the same address.");
      }
    } else {
      // Ensure token2 address is different from token1 address
      if (selectedToken.address !== token1.address) {
        setToken2(selectedToken);
      } else {
        // Handle the case where the selected token has the same address as token1
        // You can show an error message, or handle it in any way suitable for your application
        console.error("Token1 and Token2 cannot have the same address.");
      }
    }
  
    setIsOpen(false);
  }

  const ApproveTokenOne=async()=>{
    
      try{
        const TEST_TOKEN_CONTRACT= await TEST_TOKEN_CONTRACT_INSTANCE(token1.address);  
       const approveSpending =await TEST_TOKEN_CONTRACT.approve(swapAddress,AmountOneInWei); 
       console.log(`Loading - ${approveSpending.hash}`);
       setApproveOne(true)
        await approveSpending.wait();
      console.log(`Success - ${approveSpending.hash}`);
      setApproveOne(false)
      setHasApprovedOne(true)
      }catch(error){
       setApproveOne(false)
       console.log(error)
      }

   
   
   }

 
   const SwapToken=async()=>{
    
    if(token1.address == TokenList[0].address){
      try{
        const SWAP_CONTRACT= await SWAP_CONTRACT_INSTANCE();  
       const SWAP =await SWAP_CONTRACT.swap(token1.address,token2.address,AmountOneInWei,{
            value: AmountOneInWei
       }); 
       console.log(`Loading - ${SWAP.hash}`);
       setSwapping(true)
        await SWAP.wait();
      console.log(`Success - ${SWAP.hash}`);
      setSwapping(false)
      }catch(error){
       setSwapping(false)
       console.log(error)
      }
     }else if(token2.address == TokenList[0].address){
      try{
        const SWAP_CONTRACT= await SWAP_CONTRACT_INSTANCE();  
       const SWAP =await SWAP_CONTRACT.swap(token1.address,token2.address,AmountOneInWei); 
       console.log(`Loading - ${SWAP.hash}`);
       setSwapping(true)
        await SWAP.wait();
      console.log(`Success - ${SWAP.hash}`);
      setSwapping(false)
      }catch(error){
       setSwapping(false)
       console.log(error)
      } 


     }else{
      try{
        const SWAP_CONTRACT= await SWAP_CONTRACT_INSTANCE();  
       const SWAP =await SWAP_CONTRACT.swap(token1.address,token2.address,AmountOneInWei); 
       console.log(`Loading - ${SWAP.hash}`);
       setSwapping(true)
        await SWAP.wait();
      console.log(`Success - ${SWAP.hash}`);
      setSwapping(false)
      }catch(error){
       setSwapping(false)
       console.log(error)
      }

     }
    
    
   }

  return (
<>
    <Modal
    open={isOpen}
    footer={null}
    onCancel={() => setIsOpen(false)}
    title="Select a token"
  >
    <div className="modalContent">
      {TokenList?.map((e, i) => {
        return (
          <div
            className="tokenChoice"
            key={i}
            onClick={() => modifyToken(i)}
          >
            <img src={e.img} alt={e.ticker} className="tokenLogo" />
            <div className="tokenChoiceNames">
              <div className="tokenName">{e.name}</div>
              <div className="tokenTicker">{e.ticker}</div>
            </div>
          </div>
        );
      })}
    </div>
  </Modal>
    <div className="tradeBox">
        <div className="tradeBoxHeader">
        <h4 style={{color:"white",fontWeight:"bolder",fontSize:"18px"}}>Swap</h4>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <SettingOutlined className="cog" />
          </Popover>
        </div>
        <div className="inputs">
         
         
          <Input
            placeholder="0"
            value={token1Amount}
            onChange={estimate}
            
          />
          {address && !isNaN(Bal1) && (
  <div className="assetSecond" style={{color: "#5f6783"}}>
    Bal: {Bal1} {token1.ticker}
  </div>
)}


           

          

          
          <Input placeholder="0" 
          
          value={token2Amount !== null ? token2Amount : ''}

          disabled
        
          />
          
         
          <div className="switchButton" onClick={isEstimateAmount2 ? null : switchTokens} >
            {isEstimateAmount2 ?   <Spin
                className="switchArrow"
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                    }}
                    spin
                  />
                }
              />: (  <ArrowDownOutlined className="switchArrow" />)
            
            }
          
           
          </div>
       
                 
           <div className="assetOnes" onClick={() => openModal(1)}>
            
            <img src={token1.img} alt="assetOneLogo" className="assetLogo" />
           <span className="w3-text-white"> {token1.ticker} </span>
            <DownOutlined />
            
          </div>
          <div className="HeadOne" style={{color: "#5f6783"}}>
         You Pay
          </div>

          <div className="rateAssetOne" >
            <p  style={{color: "#5f6783"}}>{`${dollarRate ? '$' + dollarRate : ''}`}
</p>

          </div>

          <div className="swapAssetTwo" onClick={() => openModal(2)}>
            <img src={token2.img} alt="assetOneLogo" className="assetLogo" />
            <span className="w3-text-white">{token2.ticker}</span>  
            <DownOutlined />
          </div>

          <div className="HeadTwo" style={{color: "#5f6783"}}>
         You receive
          </div>

          {address && !isNaN(Bal2) && (
  <div className="assetThird " style={{color: "#5f6783"}}>
    Bal: {Bal2} {token2.ticker}
  </div>
)}
        </div>
{address && baseTwoRate &&
        <div className="baseEstimate">
<p className="w3-center w3-text-white" style={{marginTop:"8px",fontWeight:"bold",fontSize:"15px"}}> 1 {token2.ticker} = {baseTwoRate} {token1.ticker} </p>
        </div>

}



        
        
        {!hasApprovedOne && TokenList[0].address !=token1.address && <Button loading={isApproveOne ? true : false} className="swapButton  w3-border-0" disabled={!token1Amount || !address} onClick={ApproveTokenOne}>{isApproveOne ? 'Approving Token' : 'Approve Token'}</Button>}
      
        
        
        <Button loading={isSwapping ? true : false} onClick={SwapToken} className="swapButton w3-margin-bottom w3-border-0" disabled={!token1Amount}>{isSwapping ? 'Swapping' : 'Swap'}</Button>
      </div>
      </>
  )
}

export default SwapWidget