pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract Token is ERC20{

    address[] public managers;
    address public owner;
    mapping(address => uint[]) public buyers;
    uint public price;
    uint public ticket_number;
    uint public ussage_fee;

    constructor(address manager1, address manager2) ERC20("MocktailSwap", "MOK"){
        managers.push(manager1);
        managers.push(manager2);
        owner = msg.sender;
        price = 20;

    }

    function buyTicket(uint amount) public{


        // 1. transfer token from buyer to this contract account: transfer()

        // 2. ticket_number++

        // 3. assign tickets to buyers

        // 4. update ussage fee

    }

    function withdraw() public {
        // 1. use require to check whether the sender is owner

        // 2. transfer ussage_fee of the token to the owner

        // 3. reset the ussage fee to 0

    }

    function pickWinner() public {

        // 1. use require to check whether the sender is owner or manager

        // 2. use random to generate winner ticket number

    }

    function resetPrice(uint price) public {
        // 1. use require to check whether the sender is owner

        // 2. reset the price

    }
}

