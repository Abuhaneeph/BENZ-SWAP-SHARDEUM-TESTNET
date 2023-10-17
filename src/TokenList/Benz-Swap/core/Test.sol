// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract Test{

    function send(address addr1,uint256 amount1) public 
{
   
            // stake token1 to smart contract
            IERC20(addr1).transferFrom(
               msg.sender,
               address(this),
                amount1
            );
}
           }