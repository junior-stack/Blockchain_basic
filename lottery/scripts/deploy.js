const { ethers } = require("hardhat");

async function main() {
  Lottery = await ethers.getContractFactory("Lottery");
  [owner, addr1, addr2] = await ethers.getSigners();
  Token = await ethers.getContractFactory("MokToken");
  token = await Token.deploy();
  lottery = await Lottery.deploy(addr1.address, addr2.address, token.address);
  console.log(`token deployed at ${token.address}`);
  console.log(`lottery deployed at ${lottery.address}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
