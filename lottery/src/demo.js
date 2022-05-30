const ethers = require("ethers");

const address = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(address, lottery.abi, provider);

const f = async () => {
  const p = await contract.price();
  console.log("contract price: ", p);
};

f();
