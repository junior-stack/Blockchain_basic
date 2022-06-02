// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Lottery{

    address[] public managers;
    address public owner;
    mapping(uint => address payable) public ticketMapUser;
    uint public price;
    uint public ticket_number;
    uint public endTimeThreshold;  // starttimeplusfiveminutes
    uint public ussage_fee;
    uint public num_sold;
    IERC20 token;
    event TransferSent(address _from, address _destAddr, uint _amount);

    constructor(address manager1, address manager2, address moktoken) {
        token = IERC20(moktoken);
        managers.push(manager1);
        managers.push(manager2);
        owner = msg.sender;
        price = 20 * (10 ** 18);
        ticket_number =0;
        endTimeThreshold = block.timestamp + 5 * 60;
        num_sold = 0;
    }

    function buyTicket(address from, uint amount) public{
        // 1. transfer token from buyer to this contract account: transfer()
        uint256 quantity = amount * price;
        uint i;
        for(i = 0; i < amount; i++){
            ticketMapUser[ticket_number] = payable(from);
            ticket_number++;
        }
        num_sold += amount;
        ussage_fee += quantity * 500 / 10000;

        token.transferFrom(from, address(this), quantity);

        // 2. ticket_number++
        // 3. assign tickets to buyers
        

    }


    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(ticket_number)));
    }

    function pickWinner() public{
        //0. check 5 min and whether the game is ongoing: add a field of start time
        require(endTimeThreshold == block.timestamp, "You need to draw the lottery 5 min after the game");
        ticket_number = 0;

        num_sold = 0;
        endTimeThreshold = block.timestamp + 5 * 1000;

        // 2. use random to generate winner ticket number
        uint win = random() % ticket_number;
        // 3. Get the winner and send money to him
        uint balance = token.balanceOf(address(this));
        uint lottery_pool = balance - ussage_fee;  // the owner may not withdraw the accmulative ussage fee of previous lotteries
        token.transfer(ticketMapUser[win], lottery_pool);
        // token.transfer(address(owner), balance - lottery_pool);  remove this line and add withdraw as separate function
        // add the ussage fee

        // Reset the game
        

    }

    function resetPrice(uint newprice) public {

        // 2. Check whether the lottery is ongoing
        
        // 3. reset the price
        price = newprice * (10 ** 18);
    }

    function getBalance() public view returns (uint){
        return token.balanceOf(address(this));
    }

    function withdraw() public {
        ussage_fee = 0;
        token.transfer(owner, ussage_fee);
    }



}

