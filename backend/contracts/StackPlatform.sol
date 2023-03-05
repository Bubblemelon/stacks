// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Simple Stack contract
/// @author StacksLab
contract StackPlatform is Ownable {
    
    // the contract creator
    address payable owner;

    // total bundles in inventory
    uint256 public totalBundles;

    // mapping of a buyer's address to a list of bundles they purchased
    mapping(address => uint256[]) buyersItem;

    // mapping of a Bundle ID to an instance of a Bundle struct
    // which contrains details about a bundle
    mapping(uint256 => Bundle) private bundles;

    struct Bundle {
        uint256 bundleId;
        uint256 price;
        uint256 amountInStock;
        string description;
        uint256 timestamp;
        bool isOut;
        address[] buyers;
    }

    // enum Status {
    //     OPEN,
    //     PENDING,
    //     DELIVERY,
    //     CONFIRMED,
    //     DISPUTTED,
    //     REFUNDED,
    //     WITHDRAWED
    // }

    event BundleSold(uint256 bundleId, uint256 price, address buyer);

    constructor() {
        owner = payable(msg.sender);
        totalBundles = 0;
    }

    function buyBundle(uint256 bundleId) public payable {
        Bundle storage b = bundles[bundleId];
        address buyer = msg.sender; // address of buyer

        require(msg.value == b.price, "Incorrect price"); // check if the buyer has enough purchasing power
        require(b.isOut == false, "Item is out of stock");

        owner.transfer(b.price); // transfer money from the buyer to the owner (our wallet)

        buyersItem[msg.sender].push(bundleId); // adding the buyer to the bundle's buyers list
        b.amountInStock--;

        emit BundleSold(bundleId, b.price, buyer);
    }

    function setBundleStockAmount(uint256 _amount, uint256 _bundleId) public onlyOwner
    {
        Bundle storage b = bundles[_bundleId];
        b.amountInStock = _amount;
    }
}