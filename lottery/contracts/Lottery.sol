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
    uint public ussage_fee;
    uint public start_time;
    uint public num_sold;
    ERC20 token;
    bool public ongoing;
    event TransferSent(address _from, address _destAddr, uint _amount);

    constructor(address manager1, address manager2, address moktoken) {
        token = ERC20(moktoken);
        managers.push(manager1);
        managers.push(manager2);
        owner = msg.sender;
        price = 20;
        ticket_number =0;
        ongoing = true;
        start_time = block.timestamp;
        num_sold = 0;
    }

    function buyTicket(address from, uint amount) public onGoing returns (uint){
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

    function withdraw() public {
        // 0. The owner can only withdraw ussage fee when the lottery is ended
        require(ongoing == false, "The owner can only withdraw ussage fee when the lottery is ended");
        // 1. use require to check whether the sender is owner
        require(msg.sender == owner, "Only owners can withdraw funds");

        // 2. transfer ussage_fee of the token to the owner
        token.transfer(address(owner), ussage_fee);

        // 3. reset the ussage fee to 0
        ussage_fee = 0;

    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(ticket_number)));
    }

    function pickWinner() public onGoing{
        //0. check 5 min and whether the game is ongoing: add a field of start time

        // 1. use require to check whether the sender is owner or manager
        require(msg.sender == owner || msg.sender == managers[0] || msg.sender == managers[1], "You are not the owner or manager");

        // 2. use random to generate winner ticket number
        uint win = random() % ticket_number;
        // 3. Get the winner and send money to him
        uint balance = token.balanceOf(address(this));
        uint lottery_pool = (balance - ussage_fee) * 95 / 100;  // the owner may not withdraw the accmulative ussage fee of previous lotteries
        console.log("win: ", win);
        console.log("winner: ", ticketMapUser[win]);
        console.log("balance: ", balance);
        token.transfer(ticketMapUser[win], lottery_pool);
        // add the ussage fee
        ussage_fee += balance - lottery_pool;

        // Reset the game
        price = 20;
        ticket_number = 0;
        ongoing = false;
        num_sold = 0;

    }

    function resetPrice(uint newprice) public {
        // 1. use require to check whether the sender is owner
        require(msg.sender == owner, "Only the contract owner could reset the price");

        // 2. Check whether the lottery is ongoing
        require(num_sold == 0, "There has already been some people buying the lottery, u cannot reset the price");
        
        // 3. reset the price
        price = newprice;
    }

    modifier onGoing(){
        require(ongoing == true, "This action can only be performed when the lottery round is ongoing");
        _;
    }

    //

}

