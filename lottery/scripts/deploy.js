const { ethers, network } = require("hardhat");

async function main() {
  // const contract_owner = await ethers.getSigner(network.config.from);
  const Lottery = await ethers.getContractFactory("Lottery");
  [owner, addr1, addr2] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("MokToken");
  token = await Token.deploy(process.env.REACT_APP_BUYER_ADDRESS);
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
