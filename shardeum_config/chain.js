const SHM_config= 
    {
        // === Required information for connecting to the network === \\
        chainId: 8081, // Chain ID of the network
        // Array of RPC URLs to use
        rpc: ["https://dapps.shardeum.org"],

        // === Information for adding the network to your wallet (how it will appear for first time users) === \\
        // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
        nativeCurrency: {
          decimals: 18,
          name: "Shard",
          symbol: "SHM",
        },
        shortName: "shardeum", // Display value shown in the wallet UI
        slug: "shardeum", // Display value shown in the wallet UI
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
        chain: "Shardeum Sphinx Dapp 1.X", // Name of the network
        name: "Shardeum Sphinx Dapp 1.X", // Name of the network
      }
export default SHM_config