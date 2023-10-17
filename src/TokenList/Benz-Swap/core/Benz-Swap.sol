// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


import {Events} from "../libraries/Events.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {priceFeed} from "../feeds/PriceApi.sol";
import {ISupraSValueFeed} from "../interfaces/ISupraSValueFeed.sol";
contract Swap {
  

  int256 public rate;
 
  priceFeed private priceAPI;
    
    
    // contract admin
    address private _deployer;
    uint256 private _platformProfit;

    // charges 0.20% fee on every successful swaps
    uint private swapFee = 20;

    // ids to avoid conflicts
    uint256 private POOL_ID;
    uint256 private LIQUID_ID;
    uint256 private PROVIDER_ID;

    // token contract address => pair index address
    // only in the token paired to USD format
  
    mapping(address => uint64) public pairIndex;


    // is a member of the pairs mapping
    // but its the native pair MATIC not IERC20
    uint64 public NATIVE_INDEX;
    // paired address to USDT
    uint64 public USDT_PAIR;
    uint64 public BENZ_INDEX;

    address public BENZ_TOKEN_ADDRESS;
    address public USDT_TOKEN_ADDRESS;
    // id => liquidity pools
    mapping(uint => Pool) public pools;
    // user address => provider data
    mapping(address => Provider) public providers;
    // id => liquids
    mapping(uint => Liquid) public liquids;

    // === Structs === //

    // pool consists of liquids
    // from n numbers providers
    struct Pool {
        uint id;
        address token0;
        address token1;
        uint[] liquids;
    }

    // liquid belongs to a provider
    // also belongs to a pool
    struct Liquid {
        uint id;
        uint poolId;
        uint256 bal0;
        uint256 bal1;
        uint256 amount0;
        uint256 amount1;
        address provider;
    }

    // provider properties
    // owns n numbers of liquids
    struct Provider {
        uint id;
        uint256 totalEarned;
        uint256 balance;
        bool autoStake;
        uint[] liquids;
    }

    constructor(address _priceApI) {
        
        _deployer = msg.sender;
        
        priceAPI=priceFeed(_priceApI);

        //testnetHelper();
    }

    // calculates all the size of the liquids
    // in a pool of token pair
    function getPoolSize(
        address token0,
        address token1
    ) public view returns (uint256, uint256) {
        uint poolId = _findPool(token0, token1);
        return _poolSize(poolId);
    }

    // gets the exchanges rates for pair of tokens
    // with accordance to amount of tokens





    function estimate(
         uint64 token0,
          uint64 token1,
        uint256 amount0 // in wei
    ) public  view returns (uint256) {
        int256 _rate = priceAPI.getExchangeRate(token0,token1);
       
        return (amount0 * uint256(_rate)) / (10 ** 8);
    }

    // returns the contract address
    function getContractAddress() public view returns (address) {
        return address(this);
    }

    // returns the pair address for $MATIC
    function getNativeIndex() public view returns (uint256) {
        return NATIVE_INDEX;
    }

    // returns the pair address for $USDT
    function getUSDTAddress() public view returns (address) {
        return USDT_TOKEN_ADDRESS;
    }

    // register as a provider
    function unlockedProviderAccount() public onlyGuest {
        // create new unique id
        PROVIDER_ID++;

        // provider with default entries
        providers[msg.sender] = Provider(
            PROVIDER_ID,
            providers[msg.sender].totalEarned,
            providers[msg.sender].balance,
            false,
            providers[msg.sender].liquids
        );
    }

    // === Swapping === //

    function swap(
        address token0,
        address token1,
        uint256 amount0
    ) public payable returns (uint256) {
        return doSwap(token0, token1, amount0, msg.sender);
    }

    function doSwap(
        address token0,
        address token1,
        uint256 amount0,
        address user
    ) public payable returns (uint256) {
        require(amount0 >= 100, "Amount to swap cannot be lesser than 100 WEI");

        uint256 amount1;
        uint256 _safeAmount0 = amount0;

        uint poolId = _findPool(token0, token1);
        require(pools[poolId].id > 0, "Pool does not exists");

        // MATIC => ERC20
        if (pairIndex[pools[poolId].token0] == NATIVE_INDEX) {
            
            _safeAmount0 = msg.value;
            amount1 = estimate(NATIVE_INDEX, pairIndex[pools[poolId].token1], _safeAmount0);

            // check if contract has enough destination token liquid
            (, uint256 poolSizeToken1) = _poolSize(poolId);
            require(poolSizeToken1 >= amount1, "Insufficient Pool Size");

            uint256 fee = _transferSwappedTokens0(
                pools[poolId].token1,
                amount1,
                user
            );

            uint256 providersReward = ((fee * 80) / 100);
            
            _platformProfit += (fee - providersReward);

            _aggregateLiquids(
                _safeAmount0,
                amount1,
                poolSizeToken1,
                pools[poolId],
                providersReward
            );
        }
        // ERC20 => MATIC
        else if (pairIndex[pools[poolId].token1] == NATIVE_INDEX) {
            amount1 = estimate(pairIndex[pools[poolId].token0], NATIVE_INDEX, _safeAmount0);

            // check if contract has enough destination token liquid
            (uint256 poolSizeToken1, ) = _poolSize(poolId);
            require(poolSizeToken1 >= amount1, "Insufficient Pool Size");

            uint256 fee = _transferSwappedTokens1(
                pools[poolId].token0,
                _safeAmount0,
                amount1,
                user
            );
            uint256 providersReward = ((fee * 80) / 100);
            
            _platformProfit += (fee - providersReward);

            _aggregateLiquids(
                _safeAmount0,
                amount1,
                poolSizeToken1,
                pools[poolId],
                providersReward
            );
        }
        // ERC0 => ERC2O
        else {
            amount1 = estimate(
                pairIndex[pools[poolId].token0],
                pairIndex[pools[poolId].token1],
                _safeAmount0
            );

            // check if contract has enough destination token liquid
            (, uint256 poolSizeToken1) = _poolSize(poolId);
            require(poolSizeToken1 >= amount1, "Insufficient Pool Size");

            uint256 fee = _transferSwappedTokens2(
                pools[poolId].token0,
                pools[poolId].token1,
                _safeAmount0,
                amount1,
                user
            );

            uint256 providersReward = ((fee * 80) / 100);
           
            _platformProfit += (fee - providersReward);

            _aggregateLiquids(
                _safeAmount0,
                amount1,
                poolSizeToken1,
                pools[poolId],
                providersReward
            );
        }

        // store the swap data on-chain
        emit Events.FleepSwaped(
            amount0,
            amount1,
            token0,
            token1,
            block.timestamp
        );

        return amount1;
    }

    // === Providers === //

    function provideLiquidity(
        uint poolId,
        uint256 amount0
    ) public payable onlyProvider {
        require(amount0 >= 100, "Amount cannot be lesser than 100 WEI");

        uint256 amount1;
        uint256 _safeAmount0 = amount0;

        if (pairIndex[pools[poolId].token0] == NATIVE_INDEX) {
            require(msg.value > 100, "Matic cannot be lesser than 1OO WEI");
            // only in format of MATIC as pair subject
            // ex MATIC/XEND

            _safeAmount0 = msg.value;
            // get the estimate for token1
            amount1 = estimate(
                pairIndex[pools[poolId].token0],
                pairIndex[pools[poolId].token1],
                _safeAmount0
            );

            
            // stake token1 to smart contract
            IERC20(pools[poolId].token1).transferFrom(
                msg.sender,
                address(this),
                amount1
            );
        } else {
            // get the estimate for token1
            amount1 = estimate(
                pairIndex[pools[poolId].token0],
                pairIndex[pools[poolId].token1],
                _safeAmount0
            );
            // stake tokens to smart contract
            IERC20(pools[poolId].token0).transferFrom(
                msg.sender,
                address(this),
                _safeAmount0
            );
            IERC20(pools[poolId].token1).transferFrom(
                msg.sender,
                address(this),
                amount1
            );
        }

        uint liquidId = _liquidIndex(poolId, msg.sender);

        if (liquidId > 0) {
            // if liquid exist increment the amount
            liquids[liquidId].amount0 += _safeAmount0;
            liquids[liquidId].amount1 += amount1;
        } else {
            // otherwise create the new liquid
            _createLiquid(poolId, _safeAmount0, amount1, msg.sender);
        }

        // store the liquidity data on-chain
        emit Events.LiquidProvided(
            pools[poolId].token0,
            pools[poolId].token1,
            _safeAmount0,
            amount1,
            msg.sender,
            block.timestamp
        );
    }

    function removeLiquidity(uint id) public onlyProvider {
        require(liquids[id].provider == msg.sender, "Unauthorized");
    
         // extract pool id from liquid
        uint poolId = liquids[id].poolId;
        // extract pool struct
        Pool memory pool = pools[poolId];

         if (pairIndex[pools[poolId].token0] == NATIVE_INDEX){
              payable(msg.sender).transfer(liquids[id].bal0);
              IERC20(pool.token1).transfer(msg.sender, liquids[id].amount1);
         }else{
        // transfer tokens to providers
        IERC20(pool.token0).transfer(msg.sender, liquids[id].bal0);
        IERC20(pool.token1).transfer(msg.sender, liquids[id].bal1);

         }

        // delete liquid

        for (uint index = 0; index < pools[poolId].liquids.length; index++) {
            if (liquids[pools[poolId].liquids[index]].provider == msg.sender) {
                delete pools[poolId].liquids[index];
            }
        }

        for (
            uint index = 0;
            index < providers[msg.sender].liquids.length;
            index++
        ) {
            if (
                liquids[providers[msg.sender].liquids[index]].poolId == pool.id
            ) {
                delete providers[msg.sender].liquids[index];
            }
        }

        delete liquids[id];
    }

    // fetach all liquidities from a wallet
    function myLiquidities(
        address wallet
    )
        public
        view
        returns (
            uint256[] memory,
            uint256[] memory,
            uint256[] memory,
            uint256[] memory
        )
    {
        // array of provider liquidities position
        uint256[] memory providerLiquids = providers[wallet].liquids;

        uint256[] memory _pools = new uint256[](providerLiquids.length);
        uint256[] memory _amounts0 = new uint256[](providerLiquids.length);
        uint256[] memory _amounts1 = new uint256[](providerLiquids.length);

        for (uint index; index < providerLiquids.length; index++) {
            _pools[index] = liquids[providerLiquids[index]].poolId;
            _amounts0[index] = liquids[providerLiquids[index]].amount0;
            _amounts1[index] = liquids[providerLiquids[index]].amount1;
        }

        return (_pools, _amounts0, _amounts1, providerLiquids);
    }

    function createPool(
        address token0,
        address token1
    ) public onlyProvider returns (uint) {
        return _createPool(token0, token1);
    }

    function updateProviderProfile(bool _autoStake) public onlyProvider {
        providers[msg.sender].autoStake = _autoStake;
    }

    function withDrawEarnings(uint256 amount) public onlyProvider {
        require(
            providers[msg.sender].balance >= amount,
            "Insufficient Balance"
        );

        // USDT as reward token
        IERC20(USDT_TOKEN_ADDRESS).transfer(msg.sender, amount);

        providers[msg.sender].balance -= amount;
    }

    // === Administration === //

    function updateNativeIndex(uint64 _Native_Index) public onlyDeployer {
        
        NATIVE_INDEX = _Native_Index;
    }

    function updateUSDTAddress(address _USDT) public onlyDeployer {
        require(_USDT != address(0), "Invalid Pair Address");
        USDT_TOKEN_ADDRESS= _USDT;
    }

    function updateBenzIndex(uint64 _Benz_Index) public onlyDeployer {
      
         BENZ_INDEX = _Benz_Index;
    }

    function updateSwapFee(uint fee) public onlyDeployer {
        require(fee > 0, "Platform fee cannot be zero");
        require(fee < 1000, "Platform fee cannot be a hundred");
        swapFee = fee;
    }

    function createPair(address token, uint8 _pairIndex) public onlyDeployer {
        require(token != address(0), "Invalid Token Address");
       
        pairIndex[token] = _pairIndex;
    }

    function withDrawPlaformEarnings(
        uint256 amount,
        address receiver
    ) public onlyDeployer {
        require(_platformProfit >= amount, "Insufficient Balance");

        // Benz token as reward token
        IERC20(BENZ_TOKEN_ADDRESS).transfer(receiver, amount);
        _platformProfit -= amount;
    }

    // === Internal Functions === //

    function _liquidIndex(
        uint poolId,
        address provider
    ) private view returns (uint) {
        uint256[] memory providerLiquids = providers[provider].liquids;

        for (uint index = 0; index < providerLiquids.length; index++) {
            if (liquids[providerLiquids[index]].poolId == poolId) {
                return providerLiquids[index];
            }
        }

        return 0;
    }

    function _aggregateLiquids(
        uint256 amount0,
        uint256 amount1,
        uint256 poolSizeToken1,
        Pool memory pool,
        uint256 fee
    ) private {
        // equally share swap impact on all provider liquids based on their contribution
        for (uint index = 0; index < pool.liquids.length; index++) {
            uint liquidId = pool.liquids[index];

            // calculated with ratio of this liquid compared
            // to other liquids contributing
            uint256 additionAmount = ((liquids[liquidId].amount1 * amount0) /
                poolSizeToken1);

            // step I
            liquids[liquidId].amount0 += additionAmount;

            // calculated with ratio of this liquid compared
            // to other liquids contributing
            uint256 deductionAmount = ((liquids[liquidId].amount1 * amount1) /
                poolSizeToken1);

            // step II
            liquids[liquidId].amount1 -= deductionAmount;

            // reward the liquid provider
            uint256 reward = ((liquids[liquidId].amount1 * fee) /
                poolSizeToken1);

            address provider = liquids[liquidId].provider;

            providers[provider].totalEarned += reward;
            providers[provider].balance += reward;
        }
    }

    // MATIC => ERC20
    function _transferSwappedTokens0(
        address token1,
        uint256 amount1,
        address owner
    ) private returns (uint256) {
        IERC20 quoteToken = IERC20(token1);

        uint256 _fee = ((amount1 / 100) * swapFee);

        // give user their destination token minus fee
        quoteToken.transfer(owner, (amount1 - _fee));

        // convert fee to Fleep tokens
        return estimate(pairIndex[token1], BENZ_INDEX, _fee);
    }

    // ERC20 => MATIC
    function _transferSwappedTokens1(
        address token0,
        uint256 amount0,
        uint256 amount1,
        address owner
    ) public payable returns (uint256) {
        IERC20 baseToken = IERC20(token0);

        uint256 _fee = ((amount1 / 100) * swapFee);

        baseToken.transferFrom(owner, address(this), amount0);

        // give user their destination token minus fee
        require(
            address(this).balance >= amount1,
            "Contract: Insufficient Balance"
        );
        payable(owner).transfer(amount1 - _fee);

        // convert fee to Fleep tokens
        return estimate(NATIVE_INDEX, BENZ_INDEX, _fee);
    }

    // ERC20 => ERC20
    function _transferSwappedTokens2(
        address token0,
        address token1,
        uint256 amount0,
        uint256 amount1,
        address owner
    ) private returns (uint256) {
        IERC20 baseToken = IERC20(token0);
        IERC20 quoteToken = IERC20(token1);

        uint256 _fee = ((amount1 / 100) * swapFee);

        // tranfers the base token from user to the
        // smart contract
        baseToken.transferFrom(owner, address(this), amount0);

        // give user their destination token minus fee
        quoteToken.transfer(owner, (amount1 - _fee));

        // convert fee to Fleep tokens
        return estimate(pairIndex[token1], BENZ_INDEX, _fee);
    }

    function _inWei(uint256 amount) private pure returns (uint256) {
        return amount * 10 ** 18;
    }

    function _findPool(
        address token0,
        address token1
    ) private view returns (uint) {
        require(
            token0 != address(0) && token1 != address(0),
            "Invalid Pool Tokens"
        );
        for (uint index = 0; index <= POOL_ID; index++) {
            // patern A
            if (
                pools[index].token0 == token0 && pools[index].token1 == token1
            ) {
                return index;
            }

            // pattern B
            if (
                pools[index].token0 == token1 && pools[index].token1 == token0
            ) {
                return index;
            }
        }
        return 0;
    }

    function _createLiquid(
        uint poolId,
        uint256 amount0,
        uint256 amount1,
        address provider
    ) private {
        LIQUID_ID++;
        // create the liquid
        liquids[LIQUID_ID] = Liquid(
            LIQUID_ID,
            poolId,
            amount0,
            amount1,
            amount0,
            amount1,
            provider
        );
        // register the liquid
        pools[poolId].liquids.push(LIQUID_ID);
        providers[provider].liquids.push(LIQUID_ID);
    }

    function _poolSize(uint id) private view returns (uint256, uint256) {
        uint256 amount0;
        uint256 amount1;
        for (uint index = 0; index < pools[id].liquids.length; index++) {
            uint liquidId = pools[id].liquids[index];
            amount0 += liquids[liquidId].amount0;
            amount1 += liquids[liquidId].amount1;
        }
        return (amount0, amount1);
    }

    function _createPool(
        address token0,
        address token1
    ) private returns (uint) {
        require(
            token0 != address(0),
            "Pair does not exists, Contact admin"
        );
        require(
            token1 != address(0),
            "Pair does not exists, Contact admin"
        );

        bool exists = _findPool(token0, token1) != 0;
        if (exists) return 0;

        POOL_ID++;
        Pool memory pool = pools[POOL_ID];

        pools[POOL_ID] = Pool(POOL_ID, token0, token1, pool.liquids);

        return POOL_ID;
    }

    // === Modifiers === //

    modifier onlyGuest() {
        require(providers[msg.sender].id == 0, "Only Guest");
        _;
    }

    modifier onlyProvider() {
        require(providers[msg.sender].id != 0, "Only Provider");
        _;
    }

    modifier onlyDeployer() {
        require(msg.sender == _deployer, "Only Deployer");
        _;
    }
}
