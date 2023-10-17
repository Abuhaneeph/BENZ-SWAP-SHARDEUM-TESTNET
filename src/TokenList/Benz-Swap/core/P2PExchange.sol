// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract P2PExchange{

uint256 public ID;
 address public contractOwner;
 address buyer;
 address[] TradeableTokenAddress;
 mapping(address  => bool  ) public isTokenTradeable;
 mapping(address => uint256) public SellerIndex;
  struct Listing {
        uint256 userID;
        address  userAddress;
        address tokenToTransfer;
        uint256 amountToTransfer;
        address [] tokensDesired;
     
    }
 mapping(uint256 => Listing) public Seller;


Listing [] public SellersLists;
 constructor(){
    contractOwner=msg.sender;
    
 }

function seller(uint256 _amount,address _tokenAddress,address [] memory  _tokenDesired) public {
  require(isTokenTradeable[_tokenAddress] = true,"Token Address is not Tradeable");
  require(_amount > 0, "Ammount cannot be Zero");
   require(IERC20(_tokenAddress).balanceOf(msg.sender) >= _amount,  "Amount of token to sell cannot be zero");
  require(checkIfTradeable(_tokenDesired) == true, "Some of your Token is not Tradeable");
 IERC20 tokenAddress= IERC20(_tokenAddress);
 tokenAddress.approve(address(this),_amount);
 
 
 tokenAddress.transferFrom(
        msg.sender,
        address(this),
       _amount
    );
 Listing memory listing = Listing({
    userID: ID,
    userAddress: msg.sender,
    tokenToTransfer: _tokenAddress,
    amountToTransfer: _amount,
    tokensDesired: _tokenDesired
});
SellerIndex[msg.sender]=ID;
Seller[ID]=listing;
SellersLists.push(listing);
ID++;
}


 // Function to buy tokens from users with matching desired tokens
    function buy(address _desiredTokenAddress) public {
        require(isTokenTradeable[_desiredTokenAddress] = true,"Token Address is not Tradeable");
        address[] memory matchingUsers = getUsersWithMatchingDesiredTokens(_desiredTokenAddress);
        
        // Check if there are matching users
        require(matchingUsers.length > 0, "No matching users found.");

        // Implement your token exchange logic here
        // For example, transfer tokens from matchingUsers to the buyer
    }

function makeTradeableToken(address _tokenAddress) external onlyOwner{ 
    
    isTokenTradeable[_tokenAddress] = true;
      
}

function checkIfTradeable(address [] memory _tokenDesired) internal view returns (bool isTrue){
// Check if each desired token is tradeable
        for (uint256 i = 0; i < _tokenDesired.length; i++) {
            if (!isTokenTradeable[_tokenDesired[i]]) {
                return false; // Desired token is not tradeable
            }
        }
        
     return true;
}

 // Function to get users whose desired tokens contain the caller's choice
    function getUsersWithMatchingDesiredTokens(address callerChoice) public view returns (address[] memory) {
        address[] memory matchingUsers = new address[](SellersLists.length);
        bool matchFound = false;

        // Loop through all users
        for (uint256 i = 0; i < SellersLists.length; i++) {
            // Check if the callerChoice is in the user's desiredTokens array
            if (contains(SellersLists[i].tokensDesired, callerChoice)) {
                // If it is, add the user's address to the matchingUsers array at the corresponding index
                matchingUsers[i] = SellersLists[i].userAddress;
                matchFound = true;
            }
        }

        // Revert with an error message if no match was found
        require(matchFound, "No matching users found.");

        return matchingUsers;
    }

    // Function to check if an address exists in an array
    function contains(address[] memory array, address target) internal pure returns (bool) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == target) {
                return true;
            }
        }
        return false;
    }



    // Function to return all users who have matching desired tokens
    function getAllMatchingUsers(address _tokenAddress) public view returns (address[] memory) {
        // Assuming the caller's choice is msg.sender, you can modify this as needed
        return getUsersWithMatchingDesiredTokens(_tokenAddress);
    }

    
modifier onlyOwner{
require(msg.sender == contractOwner, "Not the contract Owner");
_;
}
}