// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/MegaBets.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract Deploy is Script {
    // MegaETH Testnet
    address constant USDM = 0x77252Dba16C234CA52674adBAC911538705FB31c;
    address constant BTC_ORACLE = 0x4bE899cF15a212fd6123E4A0E6e1B4925f493B96;
    address constant ETH_ORACLE = 0x9674Dbe42f9996e1470F8eC15a6D0aebA4a93AEb;

    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);

        vm.startBroadcast(deployerKey);

        // Deploy implementation
        MegaBets impl = new MegaBets();
        console.log("Implementation:", address(impl));

        // Deploy proxy
        bytes memory initData = abi.encodeCall(
            MegaBets.initialize,
            (
                USDM,
                deployer,       // treasury = deployer for now
                60,             // global default betting window
                60,             // global default resolution window
                1e6,            // min bet: 1 USDM
                1000e6          // max bet: 1000 USDM
            )
        );
        ERC1967Proxy proxy = new ERC1967Proxy(address(impl), initData);
        MegaBets megabets = MegaBets(address(proxy));
        console.log("Proxy:", address(proxy));

        // Configure feeds — BTC
        megabets.setFeed(bytes32("BTC1M"),  BTC_ORACLE, true, 60,  60);
        megabets.setFeed(bytes32("BTC5M"),  BTC_ORACLE, true, 300, 300);
        megabets.setFeed(bytes32("BTC10M"), BTC_ORACLE, true, 600, 600);
        megabets.setFeed(bytes32("BTC15M"), BTC_ORACLE, true, 900, 900);

        // Configure feeds — ETH
        megabets.setFeed(bytes32("ETH1M"),  ETH_ORACLE, true, 60,  60);
        megabets.setFeed(bytes32("ETH5M"),  ETH_ORACLE, true, 300, 300);
        megabets.setFeed(bytes32("ETH10M"), ETH_ORACLE, true, 600, 600);
        megabets.setFeed(bytes32("ETH15M"), ETH_ORACLE, true, 900, 900);

        console.log("All feeds configured");

        vm.stopBroadcast();
    }
}
