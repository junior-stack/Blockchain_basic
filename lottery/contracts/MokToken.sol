pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MokToken is ERC20 {
  constructor(address to) ERC20("MocktailSwap", "MOK"){
    _mint(to, 10000);
  }

  function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(spender, owner, amount);
        return true;
    }


}