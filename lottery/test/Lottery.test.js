const { assert } = require("chai");
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Lottery contract", async () => {
  let Lottery, lottery, owner, addr1, addr2, Token, token;

  beforeEach(async () => {
    Lottery = await ethers.getContractFactory("Lottery");
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("MokToken");
    token = await Token.deploy();
    lottery = await Lottery.deploy(addr1.address, addr2.address, token.address);
  });

  describe("Deployment", () => {
    it("should set the right owner: ", async () => {
      const own = await lottery.owner();
      assert(own == owner.address);
    });
  });

  describe("Mok Token", () => {
    it("Check contract balance", async () => {
      const amount = 4;
      const price = await lottery.price();
      await token.transfer(addr1.address, amount * price);
      let addr1_balance = await token.balanceOf(addr1.address);
      const old_contract_balance = await token.balanceOf(lottery.address);
      assert(Number(addr1_balance) == amount * price);
      await lottery.buyTicket(addr1.address, amount);
      addr1_balance = await token.balanceOf(addr1.address);
      const contract_balance = await token.balanceOf(lottery.address);
      assert(Number(addr1_balance) == 0);
      assert(
        Number(contract_balance) ==
          Number(old_contract_balance) + amount * price
      );
    });
  });

  describe("Lottery Contract", () => {
    it("Pick a winner: the receiver can receive money", async () => {
      const old_owner_balance = await token.balanceOf(owner.address);
      await token.transfer(addr1.address, old_owner_balance);
      const new_owner_balance = await token.balanceOf(owner.address);
      let addr1_balance = await token.balanceOf(addr1.address);
      assert(Number(new_owner_balance) == 0);
      assert(Number(addr1_balance) == old_owner_balance);

      const amount = 500;
      const ticket_price = await lottery.price();
      await lottery.buyTicket(addr1.address, amount);
      await lottery.pickWinner();

      addr1_balance = await token.balanceOf(addr1.address);
      const final_ticket_price = await lottery.price();
      const final_ticket_number = await lottery.ticket_number();
      const ussage_fee = await lottery.ussage_fee();
      assert(Number(addr1_balance) == amount * ticket_price * 0.95);
      assert(Number(ussage_fee) == amount * ticket_price * 0.05);

      // test if reset the game
      assert(final_ticket_price == 20);
      assert(final_ticket_number == 0);
    });
  });

  describe("Lottery Contract", () => {
    it("Test Withdraw", async () => {
      const old_owner_balance = await token.balanceOf(owner.address);
      await token.transfer(addr1.address, old_owner_balance);
      const new_owner_balance = await token.balanceOf(owner.address);
      const addr1_balance = await token.balanceOf(addr1.address);
      assert(Number(new_owner_balance) == 0);
      assert(Number(addr1_balance) == Number(old_owner_balance));

      await lottery.buyTicket(addr1.address, 500);
      await lottery.pickWinner();
      await lottery.withdraw();
      const owner_balance = await token.balanceOf(owner.address);
      const contract_balance = await token.balanceOf(lottery.address);
      console.log("owner balance: ", Number(owner_balance));
      console.log("old owner balance: ", Number(old_owner_balance));
      assert(Number(owner_balance) == Number(old_owner_balance) * 0.05);
      assert(Number(contract_balance) == 0);
    });
  });

  describe("Lottery Contract", () => {
    it("successful reset price", async () => {
      // successful reset
      const Price = 30;
      await lottery.resetPrice(Price);
      const newPrice = await lottery.price();
      assert(newPrice == Price);
    });
  });

  describe("Lottery Contract", () => {
    it("unsuccessful reset price", async () => {
      // unsuccessful reset
      try {
        const Price = 30;
        const amount = 4;
        const price = await lottery.price();
        await token.transfer(addr1.address, amount * price);
        await lottery.buyTicket(addr1.address, amount);
        await lottery.resetPrice(Price);
        assert(false);
      } catch (err) {
        assert(err);
      }
    });
  });
});
