pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
// import "./MokToken.sol";


contract Lottery{

    address[] public managers;
    address public owner;
    mapping(uint => address payable) public ticketMapUser;
    uint public price;
    uint public ticket_number;
    uint public start_time;
    uint public num_sold;
    ERC20 token;
    event TransferSent(address _from, address _destAddr, uint _amount);

    constructor(address manager1, address manager2, address moktoken) {
        token = ERC20(moktoken);
        managers.push(manager1);
        managers.push(manager2);
        owner = msg.sender;
        console.log("Lottery msg sender: ", msg.sender);
        price = 20;
        ticket_number =0;
        start_time = block.timestamp;
        num_sold = 0;
    }

    function buyTicket(address from, uint amount) public returns (uint){
        // 1. transfer token from buyer to this contract account: transfer()
        uint256 erc20balance = token.balanceOf(from);
        uint256 quantity = amount * price;
        console.log("buy ticket: ", quantity);
        console.log("erc balance: ", erc20balance);
        console.log("address this: ", address(this));
        console.log("message sender: ", msg.sender);
        console.log("from: ", from);
        require(erc20balance >= quantity, "your balance cannot afford this amount of lottery");
        token.approve(from, quantity);
        token.transferFrom(from, address(this), quantity);
        emit TransferSent(from, address(this), quantity);

        // 2. ticket_number++
        // 3. assign tickets to buyers
        uint i;
        for(i = 0; i < amount; i++){
            ticketMapUser[ticket_number] = payable(from);
            ticket_number++;
        }
        num_sold += amount;

    }


    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(ticket_number)));
    }

    function pickWinner() public{
        //0. check 5 min and whether the game is ongoing: add a field of start time

        // 2. use random to generate winner ticket number
        uint win = random() % ticket_number;
        // 3. Get the winner and send money to him
        uint balance = token.balanceOf(address(this));
        uint lottery_pool = balance * 95 / 100;  // the owner may not withdraw the accmulative ussage fee of previous lotteries
        console.log("win: ", win);
        console.log("winner: ", ticketMapUser[win]);
        console.log("balance: ", balance);
        token.transfer(ticketMapUser[win], lottery_pool);
        token.transfer(address(owner), balance - lottery_pool);
        // add the ussage fee

        // Reset the game
        price = 20;
        ticket_number = 0;

        num_sold = 0;
        start_time = block.timestamp;

    }

    function resetPrice(uint newprice) public {
        // 1. use require to check whether the sender is owner
        require(msg.sender == owner, "Only the contract owner could reset the price");

        // 2. Check whether the lottery is ongoing
        require(num_sold == 0, "There has already been some people buying the lottery, u cannot reset the price");
        
        // 3. reset the price
        price = newprice;
    }

    function getBalance() public view returns (uint){
        return token.balanceOf(address(this));
    }



}

