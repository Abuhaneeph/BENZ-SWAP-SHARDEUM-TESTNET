import React from 'react'
import benzPng from '../../assets/benzpng.png';
import shardeum from '../../assets/shardeum.webp';
import { ConnectWallet } from '@thirdweb-dev/react';
import { Link } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
    function myFunction() {
        var x = document.getElementById("demo");
        if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
        } else { 
          x.className = x.className.replace(" w3-show", "");
        }
      }



  return (
    <>
    <div   style={{background: "#1A1C20"}}>
       

        <div className="w3-bar" >
  <a href="#" className="w3-bar-item w3-button w3-hover-none w3-left "> <img src={benzPng} width={150}  height={80}/></a>
  

  
  
  <div className='w3-right w3-margin'>
  <a href="#" className="w3-bar-item w3-button w3-text-white w3-margin-left w3-hide-small">Link 1</a>
<a href="#" className="w3-bar-item w3-button w3-text-white w3-hide-small">Link 2</a>
  <a href="#" className="w3-bar-item w3-button w3-text-white w3-hide-small">Link 3</a>
  
<ConnectWallet className='w3-left'/>

  <a href="#" className="w3-bar-item w3-button w3-text-white w3-hide-small w3-right w3-padding-left" style={{top:"0px"}}><img src={shardeum} width={80} /></a>
 
  <a href="javascript:void(0)" className="w3-bar-item w3-text-white w3-hover-none w3-hover-text-white  w3-button w3-right  w3-hide-large w3-hide-medium" onClick={myFunction}>&#9776;</a>

 
 
  </div>
</div>
<div className='w3-bar'>
<div id="demo"  style={{background: "#1A1C20"}} className="w3-bar-block  w3-hide w3-hide-large w3-hide-medium">
  <a href="#" className="w3-bar-item w3-center w3-text-white w3-button">Link 1</a>
  <a href="#" className="w3-bar-item w3-center w3-text-white w3-button">Link 2</a>
  <a href="#" className="w3-bar-item w3-center w3-text-white w3-button">Link 3</a>

  <a href="#" className="w3-bar-item w3-center w3-button w3-text-white "><img src={shardeum} width={80} /></a>


  </div>
</div>          
   
  </div>

 
 </>
  )
}

export default Nav
