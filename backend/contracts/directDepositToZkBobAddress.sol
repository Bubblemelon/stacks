//Begin
// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; //you import the interface
import "../interfaces/IZkBobDirectDeposits.sol";

contract directDepositToZkBobAddress{

    IERC20 private bob;
    IZkBobDirectDeposits private queue;
    address private fallbackReceiver;
    uint256 private depositId;

    constructor(string memory rawZkAddress, uint256 amount) {
        // bob token smart contract address
        bob = IERC20(0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B);
        // zkbobdirectdeposit queue smart contract address
        queue = IZkBobDirectDeposits(0x668c5286eAD26fAC5fa944887F9D2F20f7DDF289);
        // user public 0x address; will receive the funds if deposit is rejectied 
        fallbackReceiver = msg.sender;  

        // Option A, through pool contract
        // Note that ether is an alias for 10**18 multiplier, as BOB token has 18 decimals
        bytes memory zkAddress = bytes(rawZkAddress);    
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

