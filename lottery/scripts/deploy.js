const { ethers } = require("hardhat");

async function main() {
  const Lottery = await ethers.getContractFactory("Lottery");
  const Token = await ethers.getContractFactory("MokToken");
  [owner, addr1, addr2] = await ethers.getSigners();
  token = await Token.deploy(process.env.REACT_APP_BUYER_ADDRESS, 500);
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
