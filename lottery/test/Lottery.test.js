const { assert } = require("chai");
const { ethers, network } = require("hardhat");

describe("pick winner", function(){
  let  lottery, owner, addr1, addr2, token;
  let old_balance;
  this.timeout(10000);
  beforeEach(async () => {
    // set up: addr1 becomes the buyer and manager of the lottery, we have addr2 to be the manager and an owner
    const Lottery = await ethers.getContractFactory("Lottery");
    const Token = await ethers.getContractFactory("MokToken");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    token = await Token.deploy(addr1.address, 500);
    const old = await token.balanceOf(addr1.address);
    old_balance = Number(old);
    lottery = await Lottery.deploy(addr1.address, addr2.address, token.address);

    //addr1 buys the tickets
    await lottery.buyTicket(addr1.address, 25);
  })

  it("checks five minutes", async () => {
    try{
      await lottery.connect(addr1).pickWinner();
      assert(false)
    } catch(err){
      assert(true);
    }
  })

  it("check if the one who picks winner is an owner or manager //should pick a winner", async () =>{
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    try{
      await lottery.connect(addr3).pickWinner();
      assert(false)
    } catch(err) {
      assert(err)
    }
   
    try{
      await lottery.connect(addr1).pickWinner();
      assert(true)
    } catch(err){
      assert(false);
    }
  })

  it("checks if the other manager could pick winner", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    try{
      await lottery.connect(addr2).pickWinner();
      assert(true)
    } catch(err) {
      assert(false)
    }
  })

  it("checks if the owner could pick winner", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    try{
      await lottery.connect(owner).pickWinner();
      assert(true)
    } catch(err) {
      assert(false)
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


