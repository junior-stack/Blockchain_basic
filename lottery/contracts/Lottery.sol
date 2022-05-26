pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Lottery{

    address[] public managers;
    address public owner;
    mapping(uint => address payable) public ticketMapUser;
    uint public price;
    uint public ticket_number;
    uint public ussage_fee;
    IERC20 token;
    event TransferSent(address _from, address _destAddr, uint _amount);

    constructor(address manager1, address manager2, address moktoken) {
        token = IERC20(moktoken);
        managers.push(manager1);
        managers.push(manager2);
        owner = msg.sender;
        price = 20;
        ticket_number =0;

    }

    function buyTicket(uint amount) public{
        // 1. transfer token from buyer to this contract account: transfer()
        uint256 erc20balance = token.balanceOf(msg.sender);
        uint256 quantity = amount * price;
        require(quantity <= erc20balance, "Only owners can withdraw funds");
        token.transfer(address(this), quantity);
        emit TransferSent(msg.sender, address(this), quantity);

        // 2. ticket_number++
        // 3. assign tickets to buyers
        uint i;
        for(i = 0; i < amount; i++){
            ticketMapUser[ticket_number] = payable(msg.sender);
            ticket_number++;
        }

    }

    function withdraw() public {
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

    function pickWinner() public {

        // 1. use require to check whether the sender is owner or manager
        require(msg.sender == owner || msg.sender == managers[0] || msg.sender == managers[1], "You are not the owner or manager");

        // 2. use random to generate winner ticket number
        uint win = random() % ticket_number;
        // 3. Get the winner and send money to him
        uint balance = token.balanceOf(address(this));
        ticketMapUser[win].transfer( balance * 95 / 100);

        // add the ussage fee
        ussage_fee += balance * 5 / 100;

    }

    function resetPrice(uint newprice) public {
        // 1. use require to check whether the sender is owner
        require(msg.sender == owner, "Only the contract owner could reset the price");
        // 2. reset the price
        price = newprice;
    }
}

