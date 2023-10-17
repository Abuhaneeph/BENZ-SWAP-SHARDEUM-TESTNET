// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol"; 

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "remix_accounts.sol";
import "./Benz-Swap.sol";
import "../tokens/TestToken.sol";
import "../feeds/PriceApi.sol";
// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract BenzSwap {
     
        TestnetToken TST;
        priceFeed Price_API;
        Swap BenzSWAP;
        address acc0;
        address acc1; 

    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeEach() public {
         acc0 = TestsAccounts.getAccount(0); 
        
       
        TST = new TestnetToken("TEST-TOKEN","TST");
        Price_API = new priceFeed(ISupraSValueFeed(0xbDE89C550CAe3595792A3D9CD2a7cFaB3267Cb6E));
        BenzSWAP = new Swap(address(Price_API)); 
        
        // <instantiate contract>
        
    }

    function inWi() public {
        
 uint256 result = TST.inWei(2);
        uint256 expected = 2 * 10**18;
        Assert.equal(result, expected, "Value in wei is not as expected");
    }

    

     function checkBalance() public {
       // Get the balance of the ERC20 token for the specified address
        uint256 balance = TST.balanceOf(acc0);

        // Define the expected balance (replace with the expected value)
        uint256 expectedBalance = 0; // Replace with the expected balance

        // Use the Assert library to check if the actual balance matches the expected balance
        Assert.equal(balance, expectedBalance, "Token balance does not match expected balance");
     }
    function checkSuccess() public {
        // Use 'Assert' methods: https://remix-ide.readthedocs.io/en/latest/assert_library.html
        Assert.ok(2 == 2, 'should be true');
        Assert.greaterThan(uint(2), uint(1), "2 should be greater than to 1");
        Assert.lesserThan(uint(2), uint(3), "2 should be lesser than to 3");
    }

    function checkSuccess2() public pure returns (bool) {
        // Use the return value (true or false) to test the contract
        return true;
    }
    
    

    /// Custom Transaction Context: https://remix-ide.readthedocs.io/en/latest/unittesting.html#customization
    /// #sender: account-1
    /// #value: 100
    function checkSenderAndValue() public payable {
        // account index varies 0-9, value is in wei
        Assert.equal(msg.sender, TestsAccounts.getAccount(1), "Invalid sender");
        Assert.equal(msg.value, 100, "Invalid value");
    }
}
    