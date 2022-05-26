# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Deployment

To deploy onto the Rinkby test net, use the following command:
`npx hardhat run scripts/deploy.js --network rinkeby`

# Read

- https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token

* https://eips.ethereum.org/EIPS/eip-20

# Questions to figure out

- Difference between transferFrom and transfer in ERC20
- Difference between allowance and approve in ERC20
