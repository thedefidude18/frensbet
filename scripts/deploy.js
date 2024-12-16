async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance));

  const Contract = await ethers.getContractFactory("SocialBetting");

  // Custom gas settings
  const contract = await Contract.deploy({
      gasLimit: 5000000, // Set an appropriate gas limit
      maxPriorityFeePerGas: ethers.utils.parseUnits("30", "gwei"), // Adjust based on current gas requirements
      maxFeePerGas: ethers.utils.parseUnits("40", "gwei"), // Adjust based on the network conditions
  });

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
