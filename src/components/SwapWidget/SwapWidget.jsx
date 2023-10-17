import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import TokenList from "../../TokenList/tokenList";
const SwapWidget = () => {
  
  const [slippage, setSlippage] = useState(2.5);
  const [token1Amount, setToken1Amount] = useState(null);
  const [token2Amount, setToken2Amount] = useState(null);
  const [token1, setToken1] = useState(TokenList[0]);
  const [token2, setToken2] = useState(TokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
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

  function changeAmount(e) {
    setToken1Amount(e.target.value);
    if(e.target.value && prices){
        setToken2Amount(1)
    }else{
      setToken2Amount(null);
    }
  }

  function switchTokens() {
   
    setToken1Amount(null);
    setToken2Amount(null);
    const one = token1;
    const two = token2;
    setToken1(two);
    setToken2(one);
  
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i){
  
    setToken1Amount(null);
    setToken2Amount(null);
    if (changeToken === 1) {
      setToken1(TokenList[i]);
    
    } else {
      setToken2(TokenList[i]);
      
    }
    setIsOpen(false);
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
            onChange={changeAmount}
            disabled
          />
          <Input placeholder="0" value={token2Amount} disabled={true} />
          <div className="switchButton" onClick={switchTokens}>
            <ArrowDownOutlined className="switchArrow" />
          </div>
          <div className="assetOnes" onClick={() => openModal(1)}>
            <img src={token1.img} alt="assetOneLogo" className="assetLogo" />
           <span className="w3-text-white"> {token1.ticker} </span>
            <DownOutlined />
          </div>
          <div className="assetTwo" onClick={() => openModal(2)}>
            <img src={token2.img} alt="assetOneLogo" className="assetLogo" />
            <span className="w3-text-white">{token2.ticker}</span>  
            <DownOutlined />
          </div>
        </div>
        <div className="swapButton w3-margin-bottom" disabled={!token1Amount}>Swap</div>
      </div>
      </>
  )
}

export default SwapWidget