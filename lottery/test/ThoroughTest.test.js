const { assert } = require("chai");
const { ethers, network } = require("hardhat");

describe("pick winner", function(){
  let  lottery, owner, addr1, addr2, token;
  let old_balance;
  this.timeout(10000);
  beforeEach(async () => {
    
    const Lottery = await ethers.getContractFactory("Lottery");
    const Token = await ethers.getContractFactory("MokToken");

    [owner, addr1, addr2] = await ethers.getSigners();

    token = await Token.deploy(addr1.address, 500);
    const old = await token.balanceOf(addr1.address);
    old_balance = Number(old);
    lottery = await Lottery.deploy(addr1.address, addr2.address, token.address);
    await lottery.buyTicket(addr1.address, 25);
  })

  it("a", async () => {
    const signer2 = lottery.provider.getSigner(addr1.address);
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    await lottery.connect(signer2).pickWinner();
    assert(true);
  })

  it("check if the one who picks winner is an owner or manager", async () =>{
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    try{
      const signer = lottery.provider.getSigner("0x246280fD39740213D089f6f3A09745cb52aC5eCA")
      await lottery.connect(signer).pickWinner();
      assert(false)
    } catch(err) {
      assert(err)
    }
   
    try{
      const signer2 = lottery.provider.getSigner(addr1.address);
      await lottery.connect(signer2).pickWinner();
      assert(true)
    } catch(err){
      assert(false);
    }
  })

  it("checks the state is changed correctly: ", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    await lottery.pickWinner();
    const ticket_num = await lottery.ticket_number();
    const num_sold = await lottery.num_sold();
    assert(Number(ticket_num) === 0);
    assert(Number(num_sold) === 0);
  })

  it("checks winner has got right amount", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    await lottery.pickWinner();
    const winner = await lottery.winner();
    let balance = await token.balanceOf(winner);
    balance = Number(balance)
    assert(balance == old_balance * 0.95);
  })

})