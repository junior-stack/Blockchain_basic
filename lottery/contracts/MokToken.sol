pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MokToken is ERC20 {
  constructor() ERC20() ERC20("MocktailSwap", "MOK"){
    _mint(msg.sender, 0);
  }

}