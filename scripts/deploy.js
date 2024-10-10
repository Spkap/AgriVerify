require('dotenv').config();

const { ethers } = require('hardhat');

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const AgriVerify = await ethers.getContractFactory('AgriVerify');
  const initialSupply = ethers.parseEther('1000000');
  const agriVerify = await AgriVerify.deploy(initialSupply);

  await agriVerify.waitForDeployment();
  console.log('AgriVerify deployed to:', agriVerify.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
