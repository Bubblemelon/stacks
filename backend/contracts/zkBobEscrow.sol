// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//import "https://github.com/zkBob/zkbob-contracts/blob/master/src/interfaces/IZkBobDirectDeposits.sol";
import "../interfaces/IZkBobDirectDeposits.sol";

contract directDepositToZkBobAddress{
    enum Status {
        OPEN,
        PENDING,
        DELIVERY,
        CONFIRMED,
        DISPUTTED,
        REFUNDED,
        WITHDRAWED
    }

    IERC20 private bob;
    IZkBobDirectDeposits private queue;
    address fallbackReceiver;
    uint256 depositId;

    constructor(uint256 amount) {
         // sepolia smart contract addresses
        bob = IERC20(0x2C74B18e2f84B78ac67428d0c7a9898515f0c46f);
        queue = IZkBobDirectDeposits(0xE3Dd183ffa70BcFC442A0B9991E682cA8A442Ade);
        // hardcoded value for testing purposes
        bytes memory zkAddress = hex"a056dcaeeb9ad09e58f9272d0a930523927dd3831b2dc756066c59b9dfa7057157ff509eec408069f238";        
        
        // user's 0x public address
        fallbackReceiver = msg.sender;  

        // Ether = 10**18 multiplier, (BOB token has 18 decimals)
        bob.approve(address(queue), amount);
        depositId = queue.directDeposit(fallbackReceiver, amount, zkAddress);
    }

    function checkDepositStatus() external view{
        IZkBobDirectDeposits.DirectDeposit memory deposit = queue.getDirectDeposit(depositId);
        require(deposit.status == IZkBobDirectDeposits.DirectDepositStatus.Completed);
    }

    // In the unlikely event the deposit is rejected by the system due to compliance or
    // AML reasons, a previously submitted direct deposit can be refunded back to the
    // specified fallback receiver address 1 day following the deposit submission.
    function refund() external {
        queue.refundDirectDeposit(depositId);
    }

}

