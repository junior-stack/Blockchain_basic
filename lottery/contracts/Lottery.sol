// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



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
        price = 20;
        ticket_number =0;
        start_time = block.timestamp;
        num_sold = 0;
    }

    function buyTicket(address from, uint amount) public{
        // 1. transfer token from buyer to this contract account: transfer()
        uint256 quantity = amount * price;
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

        // 2. Check whether the lottery is ongoing
        require(num_sold == 0, "There has already been some people buying the lottery, u cannot reset the price");
        
        // 3. reset the price
        price = newprice;
    }

    function getBalance() public view returns (uint){
        return token.balanceOf(address(this));
    }



}

