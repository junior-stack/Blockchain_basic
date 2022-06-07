const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("pick winner", function () {
  let lottery, owner, addr1, addr2, token;
  let old_balance;
  this.timeout(40000);
  beforeEach(async () => {
    // set up: addr1 becomes the buyer and manager of the lottery, we have addr2 to be the manager and an owner
    const Lottery = await ethers.getContractFactory("Lottery");
    const Token = await ethers.getContractFactory("MokToken");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    token = await Token.deploy(addr1.address, 500);
    old_balance = await token.balanceOf(addr1.address);
    lottery = await Lottery.deploy(addr1.address, addr2.address, token.address);
    //addr1 buys the tickets
    await lottery.connect(addr1).buyTicket(25);
  });

  it("should throw be an error because 5 minutes has not been passed", async () => {
    await expect(lottery.connect(addr1).pickWinner()).to.be.revertedWith(
      "You need to draw the lottery 5 min after the game"
    );
  });

  it("should throw an error because a non-manager or non-owner should not be able to pick a winner", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");

    await expect(lottery.connect(addr3).pickWinner()).to.be.revertedWith(
      "Only the managers could pick a winner"
    );
  });

  it("should succeed because the manager should be able to pick a winner", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    lottery
      .connect(addr1)
      .pickWinner()
      .then((value) => {
        expect(value).to.exist();
      });
  });

  it("should succeed because the other manager could pick winner", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    lottery
      .connect(addr2)
      .pickWinner()
      .then((value) => {
        expect(value).to.exist();
      });
  });

  it("should succeed because the owner could pick winner", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    lottery
      .connect(owner)
      .pickWinner()
      .then((value) => {
        expect(value).to.exist();
      });
  });

  it("should have ticket number and number of sold out tickets set to be zero ", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    await lottery.pickWinner();
    const ticket_num = await lottery.ticketNumber();
    const num_sold = await lottery.numSold();
    expect(ticket_num.toString()).to.equal("0");
    expect(num_sold.toString()).to.equal("0");
  });

  it("should have the winner receive right amount of tokens", async () => {
    await network.provider.send("evm_increaseTime", [5 * 60]);
    await network.provider.send("evm_mine");
    await lottery.pickWinner();
    const winner = await lottery.winner();
    let balance = await token.balanceOf(winner);
    expect(balance.toString()).to.equal((old_balance * 0.95).toString());
  });
});
