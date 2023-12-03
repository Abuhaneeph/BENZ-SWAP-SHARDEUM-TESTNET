import React,{useState,useContext,useEffect} from 'react'
import {
  ArrowDownOutlined,
  DownOutlined
} from "@ant-design/icons";
import SelectList from './Select';
import {Input,  Modal ,Button } from "antd";
import { useTokenService } from '../../../ContextProvider/TokensProvider';
import { ethers } from 'ethers';
import { ContractInstances } from '../../../ContextProvider/ContractInstanceProvider';
import { UserContext } from '../../../ContextProvider/ContextProvider';
import { toWei } from '../../../utils/constants';
const TradeModal = ({amount,Metadata,sellerToken,id}) => {
  const {TokenList,p2pAddress} = useTokenService()
    const{P2P_CONTRACT_INSTANCE, TEST_TOKEN_CONTRACT_INSTANCE,SWAP_CONTRACT_INSTANCE }=useContext(ContractInstances);
    
const[isEstimating,setEstimating]=useState(false)
  const[isOpenBuyerModal,setIsOpenBuyerModal]=useState(false)
 
  const [tokenTwo, setTokenTwo] = useState(TokenList[1]);
  const [tokenOneAmount, setTokenOneAmount] = useState(amount);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const[tokenTwoAmountRate,setTokenTwoRate]=useState('')
  const [prices, setPrices] = useState(null);
   const[isTrading,setTrading] = useState(false)
   
   const[isApprove,setApprove]=useState(false)
   const[token1Wei,setToken1Wei]=useState(false)
   const[hasApproved,setHasApproved]=useState(false)
  const{isOpenModal,setOpenModal} = useContext(UserContext)
  const calculateAmountTwo = async () => {
    
    if (tokenOneAmount!== null) {
      const SWAP_CONTRACT = await SWAP_CONTRACT_INSTANCE();
      const TokenAmountInWei = ethers.utils.parseEther(tokenOneAmount);
      setToken1Wei(TokenAmountInWei)
      setEstimating(true);
    
      try {
        const rate = await SWAP_CONTRACT.estimate(
          sellerToken,
          tokenTwo.address,
          TokenAmountInWei
        );
        setTokenTwoRate(rate)
        console.log(rate)
        const formattedRate = ethers.utils.formatEther(rate);
       
        setTokenTwoAmount(Number(formattedRate));
      } catch (error) {
        console.error(error);
        setTokenTwoAmount(null);
      } finally {
        setEstimating(false);
      }
    } else {
      // If amount1 is null, set amount2 to null
      setTokenTwoAmount(null);
      setEstimating(false);
    }
  };

  useEffect(() => {
    calculateAmountTwo();
  }, [tokenOneAmount, SWAP_CONTRACT_INSTANCE, tokenTwo,  setTokenTwoAmount, setEstimating]);


  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if(e.target.value && prices){
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
    }else{
      setTokenTwoAmount(null);
    }
  }
  function openModal(asset) {
    setOpenModal(false)   
    setIsOpenBuyerModal(true);
   
  }
  function modifyToken(i){
        setTokenTwo(TokenList[i]);
        setIsOpenBuyerModal(false)
        setOpenModal(true)
      }
  



   function onCancelBuyModal(){
setIsOpenBuyerModal(false)   
setOpenModal(true)
   } 
     

 
   

  


const ApproveToken=async()=>{

 
  


 
  
   const TEST_TOKEN_CONTRACT= await TEST_TOKEN_CONTRACT_INSTANCE(tokenTwo.address);  
  const approveSpending =await TEST_TOKEN_CONTRACT.approve(p2pAddress,tokenTwoAmountRate);

  setApprove(true) 
  console.log(`Loading - ${approveSpending.hash}`);
       await approveSpending.wait();
       console.log(`Success - ${approveSpending.hash}`);
    setApprove(false)
    setHasApproved(true)
    

}

const executeTrade=async()=>{
  if(tokenTwo.address == TokenList[0].address){     
  try{ 
    

    
  
    
    const P2P_CONTRACT=await P2P_CONTRACT_INSTANCE()
     const executeTrade =await P2P_CONTRACT.executeTokenPurchase(id, tokenTwo.address,{
        value: tokenTwoAmountRate

     });
     console.log(`Loading - ${executeTrade.hash}`);
     setTrading(true) 

          await executeTrade.wait();
          console.log(`Success - ${executeTrade.hash}`);
        setTrading(false);
        setOpenModal(false);
        window.location.reload();
         

 }catch(error){
  setTrading(false);
console.log(error)
}
}else{
  try{ 
    
    
    const P2P_CONTRACT=await P2P_CONTRACT_INSTANCE()
     const executeTrade =await P2P_CONTRACT.executeTokenPurchase(id, tokenTwo.address)
     setTrading(true) 
     console.log(`Loading - ${executeTrade.hash}`);
          await executeTrade.wait();
          console.log(`Success - ${executeTrade.hash}`);
          setTrading(false);
          setOpenModal(false);
          window.location.reload();
          

 }catch(error){
  setTrading(false);
console.log(error)
}
  
}



}

  
  
  
  
  
  return (
<>
<Modal
        open={isOpenBuyerModal}
        footer={null}
        onCancel={onCancelBuyModal}
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

<Modal
open={isOpenModal}
footer={null}

onCancel={() => setOpenModal(false)}
>
    <div>
 <div className="tradeBox w3-center">
        <div className="tradeBoxHeader">
          <h4 style={{color:"white",fontWeight:"bolder",fontSize:"18px"}}>Trade</h4>
      
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!prices}
            className='w3-left'
          />
          <Input placeholder="0" value={tokenTwoAmount} disabled={true}  />
          <div className="switchButton"  >
            <ArrowDownOutlined className="switchArrow" />
          </div>

        

          <div className="assetOnes"  >
             <SelectList Metadata={Metadata}/>
          </div>
       
          
          <div className="assetTwo" onClick={() => openModal(1)} >
            <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
            {tokenTwo.ticker}
            <DownOutlined />
          </div>
        </div>
   {tokenTwo.address != TokenList[0].address && !hasApproved   && 
      (<Button className="estimateBtn w3-border-0" loading={isApprove ? true : false} onClick={ApproveToken} disabled={!tokenOneAmount}>{isApprove ? 'Approving Token' : 'Approve'}</Button>)}
        
    <Button loading={isTrading ? true : false} className="swapButton w3-border-0" onClick={executeTrade} disabled={!tokenOneAmount}>{isTrading ? 'Trading...' : 'Trade'}</Button>
      </div>

      
    </div>
    </Modal>
    </>
  )
}

export default TradeModal