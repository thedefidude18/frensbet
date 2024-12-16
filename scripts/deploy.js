async function main() {
<<<<<<< HEAD
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Contract = await ethers.getContractFactory("YourContractName");
  const contract = await Contract.deploy();
=======
  // Get the signer's wallet from Hardhat
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract to deploy (make sure this matches the contract name in your Solidity file)
  const Contract = await ethers.getContractFactory("SocialBetting"); // Update with your contract name
  const contract = await Contract.deploy();

>>>>>>> c3a4da3 (hardhat22)
  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
