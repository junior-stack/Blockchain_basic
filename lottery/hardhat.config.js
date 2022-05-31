require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const INFURA_URL = process.env.INFURA_URL;

const PRIVATE_KEY_DEPLOYER = process.env.REACT_APP_PRIVATE_KEY_DEPLOYER;

const PRIVATE_KEY_MANAGER_ONE = process.env.REACT_APP_PRIVATE_KEY_MANAGER_ONE;

const PRIVATE_KEY_MANAGER_TWO = process.env.REACT_APP_PRIVATE_KEY_MANAGER_TWO;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [
        `0x${PRIVATE_KEY_DEPLOYER}`,
        `0x${PRIVATE_KEY_MANAGER_ONE}`,
        `0x${PRIVATE_KEY_MANAGER_TWO}`,
      ],
    },
    hardhat: {
      chainId: 1337,
      from: process.env.REACT_APP_HARDHAT_ACCOUNT,
    },
    localhost: {
      from: process.env.REACT_APP_HARDHAT_ACCOUNT,
    },
  },
  paths: {
    cache: "./src/cache",
    artifacts: "./src/artifacts",
  },
};
