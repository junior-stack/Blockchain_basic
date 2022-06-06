// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Lottery is AccessControl{
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant OWNER = keccak256("owner");
    bytes32 public constant MANAGER = keccak256("managers");
    mapping(uint => address payable) public ticketMapUser;
    uint public price;
    uint public ticketNumber;
    uint public endTimeThreshold;  
    uint public usageFee;
    uint public numSold;
    address public winner;
    IERC20 token;
    mapping(bytes32 => EnumerableSet.AddressSet) private _roleMembers;

    event buy(address sender, uint amount, uint price);
    event pick(address winner, uint ticketNum, uint prize);
    event priceChange(uint old_price, uint new_price);
    event withDraw(uint usageFee, address own);

    constructor(address manager1, address manager2, address moktoken) {
        token = IERC20(moktoken);
        _setupRole(OWNER, msg.sender);
        _setupRole(MANAGER, manager1);
        _setupRole(MANAGER, manager2);
        price = 20 ether;
        ticketNumber =0;
        winner = address(0);
        endTimeThreshold = block.timestamp + 5 minutes;
        numSold = 0;
    }

    function buyTicket(uint amount) external{
        // 1. update ticketMapUser, numSold and usageFee
        uint256 quantity = amount * price;
        uint i;
        for(i = 0; i < amount; i++){
            ticketMapUser[ticketNumber] = payable(msg.sender);
            ticketNumber++;
        }
        numSold += amount;
        usageFee += quantity * 500 / 10000;

        //send the token to the contract's address from the buyer's address
        token.transferFrom(msg.sender, address(this), quantity);

        //emit the event
        emit buy(msg.sender, amount, price);
    }

    function getRoleMember(bytes32 role, uint256 index) internal view virtual returns (address) {
        return _roleMembers[role].at(index);
    }


    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(ticketNumber)));
    }

    function pickWinner() external {
        //0. check this function must be called 5 min after the new round and the caller must be either manager or owner
        require(endTimeThreshold <= block.timestamp, "You need to draw the lottery 5 min after the game");
        require(hasRole(MANAGER, msg.sender) || hasRole(OWNER, msg.sender), "Only the managers could pick a winner");

        // reset the ticketNumber and number of sold out ticket for the new round
        uint ticknum = ticketNumber;
        ticketNumber = 0;
        numSold = 0;
        endTimeThreshold = block.timestamp + 5 minutes;

        // find the winner of the lottery
        uint win = random() % ticknum;
        winner = ticketMapUser[win];

        // Calculate the right amount and transfer to the buyer
        uint balance = token.balanceOf(address(this));
        uint lotteryPool = balance - usageFee;  // the owner may not withdraw the accmulative ussage fee of previous lotteries
        token.transfer(ticketMapUser[win], lotteryPool);

        // emit the pick event
        emit pick(winner, ticketNumber, lotteryPool);
        

    }

    function setPrice(uint newprice) external checkOwner{
        // set the price and emit the priceChange event
        uint oldPrice = price;
        price = newprice * (10 ** 18);
        emit priceChange(oldPrice, price);
    }

    function getBalance() public view returns (uint){
        return token.balanceOf(address(this));
    }

    function withdraw() external checkOwner{
        // transfer the usage fee and set the ussage fee to 0
        uint lastUssage = usageFee;
        usageFee = 0;
        token.transfer(getRoleMember(OWNER, 0), lastUssage);

        // emit the withDraw event
        emit withDraw(usageFee, owner());
    }

    modifier checkOwner(){
        require(hasRole(OWNER, msg.sender), "Only the owner could reset the price");
        _;
    }


    function owner() public view returns (address){
        return getRoleMember(OWNER, 0);
    }

    function managers(uint index) public view returns (address) {
        return getRoleMember(MANAGER, index);
    }

}


