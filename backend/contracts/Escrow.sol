// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Escrow is ReentrancyGuard {
    uint256 public escBal;
    uint256 public escAvailBal;
    uint256 public escFee;
    uint256 public totalItems = 0;
    uint256 public totalConfirmed = 0;
    uint256 public totalDisputed = 0;
    address public arbiter;
    address public beneficiary;
    address public depositor;

    mapping(uint256 => ItemStruct) private items;
    mapping(address => ItemStruct[]) private itemsOf;
    mapping(address => mapping(uint256 => bool)) public requested;
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => Available) public isAvailable;

    enum Status {
        OPEN,
        PENDING,
        DELIVERY,
        CONFIRMED,
        DISPUTTED,
        REFUNDED,
        WITHDRAWED
    }

    enum Available { NO, YES }

    struct ItemStruct {
        uint256 itemId;
        string purpose;
        uint256 amount;
        uint256 timestamp;
        address owner;
        address provider;
        Status status;
        bool provided;
        bool confirmed;
    }

    event Action (
        uint256 itemId,
        string actionType,
        Status status,
        address indexed executor
    );

    bool public isApproved;

    constructor(address _arbiter, address _beneficiary) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

    event Approved(uint);

    function createItem(
        string calldata purpose
    ) payable external returns (bool) {
        require(bytes(purpose).length > 0, "Purpose cannot be empty");
        require(msg.value > 0 ether, "Item cannot be zero ethers");

        uint256 itemId = totalItems++;
        ItemStruct storage item = items[itemId];

        item.itemId = itemId;
        item.purpose = purpose;
        item.amount = msg.value;
        item.timestamp = block.timestamp;
        item.owner = msg.sender;
        item.status = Status.OPEN;

        itemsOf[msg.sender].push(item);
        ownerOf[itemId] = msg.sender;
        isAvailable[itemId] = Available.YES;
        escBal += msg.value;

        emit Action (
            itemId,
            "ITEM CREATED",
            Status.OPEN,
            msg.sender
        );
        return true;
    }

	function approve() external {
		require(msg.sender == arbiter);
		uint balance = address(this).balance;
		(bool sent, ) = payable(beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balance);
		isApproved = true;
	}
}